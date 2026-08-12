# Offline, app state, and deep links

## Network banner

```bash
npx expo install @react-native-community/netinfo
```

```jsx
import NetInfo from '@react-native-community/netinfo';

useEffect(() => {
  const unsub = NetInfo.addEventListener((state) => {
    setOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
  });
  return unsub;
}, []);

{!online && <Text>No internet connection</Text>}
```

Firestore can cache data if you enable persistence. Still show a banner so the user knows they are offline.

## App came back to the foreground

Refresh stale data when the user returns:

```jsx
import { AppState } from 'react-native';

useEffect(() => {
  const sub = AppState.addEventListener('change', (next) => {
    if (next === 'active') reload();
  });
  return () => sub.remove();
}, []);
```

## Deep links (open a screen from a URL)

In `app.json`:

```json
{
  "expo": {
    "scheme": "myapp"
  }
}
```

```js
import * as Linking from 'expo-linking';

const url = Linking.createURL('property/123');
// myapp://property/123
```

React Navigation linking:

```jsx
const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Details: 'property/:id',
      Home: '',
    },
  },
};

<NavigationContainer linking={linking}>
```

A link like `myapp://property/123` then opens `Details` with `id=123`.

## WebView (help pages, terms)

```bash
npx expo install react-native-webview
```

```jsx
import { WebView } from 'react-native-webview';

<WebView source={{ uri: 'https://example.com/terms' }} style={{ flex: 1 }} />
```
