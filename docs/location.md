# Location

```bash
npx expo install expo-location
```

## Current position

```js
import * as Location from 'expo-location';

export async function getCurrentCoords() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const pos = await Location.getCurrentPositionAsync({});
  return {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
  };
}
```

## Address from coordinates (reverse geocode)

```js
const places = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
const line = places[0]
  ? `${places[0].street}, ${places[0].city}`
  : null;
```

## Open the maps app

No native map required (works in Expo Go):

```js
import { Linking, Platform } from 'react-native';

function openMaps(lat, lng, label = '') {
  const url = Platform.select({
    ios: `maps:0,0?q=${label}@${lat},${lng}`,
    android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
  });
  Linking.openURL(url);
}
```

An in-app map (`react-native-maps`) needs a **dev client / EAS build**. It will not run in Expo Go.
