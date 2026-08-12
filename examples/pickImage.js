import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export async function pickImageFromLibrary() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission needed', 'Allow photo access to choose a picture.');
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

export async function takePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission needed', 'Allow camera access to take a picture.');
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    allowsEditing: true,
  });

  if (result.canceled) return null;
  return result.assets[0].uri;
}
