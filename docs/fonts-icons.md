# Fonts and icons

## Icons

```bash
npx expo install @expo/vector-icons
```

Browse names at [icons.expo.fyi](https://icons.expo.fyi/).

```jsx
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

<Ionicons name="chevron-back" size={24} color="#111827" />
<MaterialIcons name="home" size={24} color="#2563EB" />
<AntDesign name="mail" size={22} color="#6B7280" />
```

Put an icon next to label text:

```jsx
<Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <Ionicons name="log-out-outline" size={20} color="#DC2626" />
  <Text style={{ color: '#DC2626', fontWeight: '600' }}>Log out</Text>
</Pressable>
```

## Custom fonts

```bash
npx expo install expo-font @expo-google-fonts/inter
```

```jsx
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <RootNavigator />;
}
```

Use the font name in styles:

```js
{ fontFamily: 'Inter_600SemiBold', fontSize: 16 }
```

Do not render screens until fonts are loaded, or text will jump.
