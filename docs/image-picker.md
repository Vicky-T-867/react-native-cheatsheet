# Image picker and camera

```bash
npx expo install expo-image-picker
```

On a real device, the user must allow photo library / camera access. The first call prompts them.

## Pick from library

```jsx
import * as ImagePicker from 'expo-image-picker';

async function pickImage() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission needed', 'Allow photo access to upload a picture.');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.7,
    allowsEditing: true,
    aspect: [1, 1],
  });

  if (result.canceled) return null;
  return result.assets[0].uri;
}
```

Show it:

```jsx
{uri ? <Image source={{ uri }} style={{ width: 120, height: 120, borderRadius: 60 }} /> : null}
```

## Take a photo

```jsx
async function takePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    allowsEditing: true,
  });

  if (result.canceled) return null;
  return result.assets[0].uri;
}
```

## Upload that URI to Firebase Storage

See [`firebase.md`](firebase.md#10-upload-a-photo-storage). `fetch(uri)` → `blob()` → `uploadBytes`.

## Pick a document (PDF)

```bash
npx expo install expo-document-picker
```

```js
import * as DocumentPicker from 'expo-document-picker';

const result = await DocumentPicker.getDocumentAsync({
  type: 'application/pdf',
  copyToCacheDirectory: true,
});
if (!result.canceled) {
  const file = result.assets[0]; // file.uri, file.name, file.mimeType
}
```
