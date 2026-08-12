# Feedback: toast, share, haptics, clipboard

`Alert.alert` is fine for confirmations. For “Saved” / “Copied”, use a toast so you do not block the screen.

## Simple toast (no library)

Copy [`examples/Toast.js`](../examples/Toast.js) and render it at the root of a screen:

```jsx
const [toast, setToast] = useState('');

<Button label="Save" onPress={async () => {
  await save();
  setToast('Saved');
}} />

<Toast message={toast} onHide={() => setToast('')} />
```

## Share sheet

```jsx
import { Share } from 'react-native';

async function shareListing(title, url) {
  await Share.share({
    message: `${title}\n${url}`,
    url, // iOS
  });
}
```

## Clipboard

```bash
npx expo install expo-clipboard
```

```js
import * as Clipboard from 'expo-clipboard';

await Clipboard.setStringAsync('HELLO123');
const text = await Clipboard.getStringAsync();
```

## Haptics (tap feel)

```bash
npx expo install expo-haptics
```

```js
import * as Haptics from 'expo-haptics';

Haptics.selectionAsync(); // picker / tab
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
```

Call haptics in `onPress`, not on every render.

## Action sheet (iOS) / Android chooser

```jsx
import { ActionSheetIOS, Platform, Alert } from 'react-native';

function pickPhotoSource() {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      { options: ['Cancel', 'Camera', 'Photo library'], cancelButtonIndex: 0 },
      (index) => {
        if (index === 1) takePhoto();
        if (index === 2) pickImageFromLibrary();
      }
    );
    return;
  }

  Alert.alert('Add photo', '', [
    { text: 'Camera', onPress: takePhoto },
    { text: 'Photo library', onPress: pickImageFromLibrary },
    { text: 'Cancel', style: 'cancel' },
  ]);
}
```
