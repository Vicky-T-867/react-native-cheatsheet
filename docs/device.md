# Device: links, dates, back button, screen size

## Open phone, email, maps, or a website

```jsx
import { Linking, Alert } from 'react-native';

async function openUrl(url) {
  const supported = await Linking.canOpenURL(url);
  if (!supported) {
    Alert.alert('Cannot open', url);
    return;
  }
  await Linking.openURL(url);
}

openUrl('tel:+61400000000');
openUrl('mailto:hello@example.com?subject=Help');
openUrl('https://maps.google.com/?q=Wollongong');
openUrl('https://example.com');
```

## Date / time picker

```bash
npx expo install @react-native-community/datetimepicker
```

```jsx
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, Text } from 'react-native';

const [date, setDate] = useState(new Date());
const [open, setOpen] = useState(false);

<Pressable onPress={() => setOpen(true)}>
  <Text>{date.toDateString()}</Text>
</Pressable>

{open && (
  <DateTimePicker
    value={date}
    mode="date"
    onChange={(event, next) => {
      if (Platform.OS === 'android') setOpen(false);
      if (next) setDate(next);
    }}
  />
)}
```

On iOS the spinner stays on screen until you hide it. On Android it is a dialog.

## Android hardware back

```jsx
import { BackHandler } from 'react-native';
import { useEffect } from 'react';

useEffect(() => {
  const sub = BackHandler.addEventListener('hardwareBackPress', () => {
    if (unsaved) {
      Alert.alert('Discard changes?', '', [
        { text: 'Stay', style: 'cancel' },
        { text: 'Discard', onPress: () => navigation.goBack() },
      ]);
      return true; // we handled it
    }
    return false; // default back
  });
  return () => sub.remove();
}, [unsaved, navigation]);
```

## Screen size

```jsx
import { useWindowDimensions } from 'react-native';

const { width, height } = useWindowDimensions();
const isTablet = width >= 768;
```

Prefer `useWindowDimensions` over `Dimensions.get('window')` so rotation updates.
