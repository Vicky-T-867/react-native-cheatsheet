# Push notifications

```bash
npx expo install expo-notifications expo-device
```

Physical device required. Expo Go can test some notification behavior; a production push token needs an EAS build.

## Ask permission and get a token

```js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPush() {
  if (!Device.isDevice) return null;

  const { status: existing } = await Notifications.getPermissionsAsync();
  let status = existing;
  if (existing !== 'granted') {
    const res = await Notifications.requestPermissionsAsync();
    status = res.status;
  }
  if (status !== 'granted') return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token; // save this on the user in Firestore
}
```

## Local notification (reminder)

```js
await Notifications.scheduleNotificationAsync({
  content: { title: 'Rent due', body: 'Inspection is tomorrow' },
  trigger: { seconds: 5 },
});
```

## Open a screen when tapped

```js
useEffect(() => {
  const sub = Notifications.addNotificationResponseReceivedListener((response) => {
    const screen = response.notification.request.content.data?.screen;
    if (screen) navigation.navigate(screen);
  });
  return () => sub.remove();
}, [navigation]);
```

Send a push from a server with the Expo Push API and the saved token. Do not put secret server keys in the app.
