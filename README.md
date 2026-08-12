# React Native Cheatsheet (Expo)

Copy-paste recipes for building mobile apps with **Expo + React Native**.

Built for day-to-day UI work: screens, buttons, inputs, lists, layout, navigation, storage, and Firebase.

> Stack this matches: Expo SDK 54, React Native 0.81, React Navigation 6, Firebase JS SDK.

## Contents

1. [Start a project](#1-start-a-project)
2. [App file structure](#2-app-file-structure)
3. [Core components](#3-core-components)
4. [Buttons](#4-buttons)
5. [Text and images](#5-text-and-images)
6. [Inputs and forms](#6-inputs-and-forms)
7. [Lists](#7-lists)
8. [Layout and Flexbox](#8-layout-and-flexbox)
9. [Styling](#9-styling)
10. [State and hooks](#10-state-and-hooks)
11. [Navigation](#11-navigation)
12. [Alerts, modals, loading](#12-alerts-modals-loading)
13. [Storage](#13-storage)
14. [Platform and safe area](#14-platform-and-safe-area)
15. [Common gotchas](#15-common-gotchas)
16. [Firebase](#16-firebase)
17. [Reusable examples](#17-reusable-examples)

---

## 1. Start a project

```bash
npx create-expo-app@latest MyApp
cd MyApp
npx expo start
```

| Command | What it does |
| --- | --- |
| `npx expo start` | Open Expo Dev Tools / QR code |
| `i` | Open iOS simulator |
| `a` | Open Android emulator |
| `w` | Open in web browser |
| `r` | Reload the app |

Install extras you will use often:

```bash
npx expo install react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo install @expo/vector-icons
npx expo install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-gesture-handler
```

---

## 2. App file structure

```text
MyApp/
  App.js                 # entry screen / navigator
  src/
    screens/             # one file per screen
    components/          # reusable UI (Button, Card, Input)
    theme/               # colors, spacing, shared styles
    context/             # auth, theme, global state
```

A screen is just a component that fills the phone:

```jsx
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
```

---

## 3. Core components

React Native does **not** use HTML tags. Use these instead:

| Web | React Native |
| --- | --- |
| `<div>` | `<View>` |
| `<p>` / `<span>` | `<Text>` |
| `<img>` | `<Image>` |
| `<button>` | `<Pressable>` or `<TouchableOpacity>` |
| `<input>` | `<TextInput>` |
| scrollable page | `<ScrollView>` |
| long list | `<FlatList>` |

```jsx
import { View, Text, Image, ScrollView } from 'react-native';

<ScrollView>
  <View>
    <Text>This text must live inside Text</Text>
    <Image
      source={{ uri: 'https://picsum.photos/200' }}
      style={{ width: 200, height: 200 }}
    />
  </View>
</ScrollView>
```

**Rule:** every visible string must be wrapped in `<Text>`. This is invalid:

```jsx
<View>Hello</View>   // crash
```

---

## 4. Buttons

Use **Pressable** for new UI. Use **TouchableOpacity** if you want a simple fade. Avoid the built-in `<Button>` when you need custom colors, padding, or rounded corners.

### Pressable (recommended)

```jsx
import { Pressable, Text, StyleSheet } from 'react-native';

<Pressable
  onPress={() => console.log('tapped')}
  style={({ pressed }) => [styles.button, pressed && styles.pressed]}
>
  <Text style={styles.buttonText}>Continue</Text>
</Pressable>

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### TouchableOpacity (simple fade)

```jsx
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity
  activeOpacity={0.7}
  onPress={() => navigation.goBack()}
  style={styles.button}
>
  <Text style={styles.buttonText}>Back</Text>
</TouchableOpacity>
```

### Built-in Button (limited styling)

```jsx
import { Button } from 'react-native';

<Button title="Save" onPress={handleSave} color="#2563EB" />
```

You cannot change padding, border radius, or font on this component. Prefer Pressable.

### Disabled and loading

```jsx
<Pressable
  disabled={isSaving}
  onPress={handleSave}
  style={[styles.button, isSaving && { opacity: 0.5 }]}
>
  {isSaving ? (
    <ActivityIndicator color="#FFFFFF" />
  ) : (
    <Text style={styles.buttonText}>Save</Text>
  )}
</Pressable>
```

### Button styles you will reuse

| Style | Look |
| --- | --- |
| Primary | filled background, white text |
| Secondary | light/white background, border |
| Outline | transparent, colored border |
| Ghost / text | no background, just text |
| Icon | square/circle tap target |

See ready-to-copy components in [`examples/Button.js`](examples/Button.js).

---

## 5. Text and images

### Text

```jsx
<Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>
  Title
</Text>

<Text numberOfLines={2} ellipsizeMode="tail">
  Long paragraph that will be cut off after two lines.
</Text>
```

### Local image

Put the file in the project, then require it:

```jsx
<Image
  source={require('./assets/logo.png')}
  style={{ width: 120, height: 40 }}
  resizeMode="contain"
/>
```

### Remote image

```jsx
<Image
  source={{ uri: 'https://picsum.photos/400' }}
  style={{ width: '100%', height: 200, borderRadius: 12 }}
/>
```

### Icons (Expo)

```jsx
import { Ionicons } from '@expo/vector-icons';

<Ionicons name="chevron-back" size={24} color="#111827" />
```

---

## 6. Inputs and forms

```jsx
import { useState } from 'react';
import { TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const [email, setEmail] = useState('');

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  style={{ flex: 1 }}
>
  <TextInput
    value={email}
    onChangeText={setEmail}
    placeholder="Email"
    placeholderTextColor="#9CA3AF"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    style={styles.input}
  />
</KeyboardAvoidingView>
```

```js
input: {
  height: 48,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 12,
  paddingHorizontal: 16,
  fontSize: 16,
  backgroundColor: '#FFFFFF',
}
```

### Useful TextInput props

| Prop | Use |
| --- | --- |
| `secureTextEntry` | password field |
| `keyboardType="numeric"` | numbers |
| `multiline` | notes / bio |
| `maxLength={40}` | cap length |
| `editable={false}` | read-only |

### Switch

```jsx
import { Switch } from 'react-native';

<Switch value={enabled} onValueChange={setEnabled} />
```

See [`examples/TextField.js`](examples/TextField.js).

---

## 7. Lists

For **short** lists, `.map()` is fine. For **long** lists, use `FlatList` so items recycle.

```jsx
import { FlatList, Text, View } from 'react-native';

<FlatList
  data={properties}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text>{item.title}</Text>
    </View>
  )}
  ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
  contentContainerStyle={{ padding: 16 }}
  ListEmptyComponent={<Text>No results</Text>}
/>
```

Pull to refresh:

```jsx
<FlatList
  refreshing={loading}
  onRefresh={fetchProperties}
  data={properties}
  ...
/>
```

---

## 8. Layout and Flexbox

React Native uses Flexbox. Default direction is **column** (not row like the web).

```jsx
<View style={{ flex: 1, padding: 24, gap: 12 }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text>Left</Text>
    <Text>Right</Text>
  </View>
</View>
```

| Style | Meaning |
| --- | --- |
| `flex: 1` | fill remaining space |
| `flexDirection: 'row'` | left to right |
| `justifyContent` | main axis (space-between, center) |
| `alignItems` | cross axis (center, stretch) |
| `gap: 12` | space between children |
| `padding` / `margin` | inset / offset |

Center something on the screen:

```js
{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
```

Two columns:

```js
{
  flexDirection: 'row',
  gap: 12,
}
```

```js
col: { flex: 1 }
```

---

## 9. Styling

There is no CSS file. Use `StyleSheet.create`:

```jsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
```

Combine styles with an array:

```jsx
<View style={[styles.card, disabled && { opacity: 0.5 }, { marginTop: 8 }]} />
```

Keep colors in one place:

```js
export const colors = {
  background: '#F9FAFB',
  text: '#111827',
  muted: '#6B7280',
  primary: '#2563EB',
  border: '#E5E7EB',
  white: '#FFFFFF',
};
```

See [`examples/theme.js`](examples/theme.js) and [`examples/Card.js`](examples/Card.js).

---

## 10. State and hooks

```jsx
import { useState, useEffect } from 'react';

const [count, setCount] = useState(0);
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  let alive = true;

  async function load() {
    const data = await fetchItems();
    if (alive) {
      setItems(data);
      setLoading(false);
    }
  }

  load();
  return () => {
    alive = false;
  };
}, []);
```

Update an object:

```js
setUser((prev) => ({ ...prev, name: 'Alex' }));
```

Add to an array:

```js
setItems((prev) => [...prev, newItem]);
```

---

## 11. Navigation

```bash
npx expo install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-gesture-handler react-native-safe-area-context
```

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

Move between screens:

```jsx
navigation.navigate('Details', { id: '123' });
navigation.goBack();
navigation.replace('SignIn');
```

Read params:

```jsx
const { id } = route.params;
```

Hide the default header if you build your own:

```jsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ headerShown: false }}
/>
```

---

## 12. Alerts, modals, loading

### Alert

```jsx
import { Alert } from 'react-native';

Alert.alert('Delete listing?', 'This cannot be undone.', [
  { text: 'Cancel', style: 'cancel' },
  { text: 'Delete', style: 'destructive', onPress: handleDelete },
]);
```

### Loading spinner

```jsx
import { ActivityIndicator, View } from 'react-native';

if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
```

### Modal

```jsx
import { Modal, View, Pressable, Text } from 'react-native';

<Modal visible={open} transparent animationType="fade">
  <View style={styles.backdrop}>
    <View style={styles.sheet}>
      <Text>Saved</Text>
      <Pressable onPress={() => setOpen(false)}>
        <Text>Close</Text>
      </Pressable>
    </View>
  </View>
</Modal>
```

---

## 13. Storage

Save small values on the device with AsyncStorage:

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('token', token);
const token = await AsyncStorage.getItem('token');
await AsyncStorage.removeItem('token');
```

Save an object:

```js
await AsyncStorage.setItem('user', JSON.stringify(user));
const user = JSON.parse((await AsyncStorage.getItem('user')) ?? 'null');
```

---

## 14. Platform and safe area

```jsx
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
  {/* content stays below the notch / status bar */}
</SafeAreaView>
```

Different values per platform:

```js
paddingTop: Platform.OS === 'ios' ? 12 : 8
```

```js
Platform.select({
  ios: { shadowOpacity: 0.1 },
  android: { elevation: 3 },
})
```

---

## 15. Common gotchas

- All visible text must be inside `<Text>`.
- Default flex direction is `column`, not `row`.
- Images need a width and height, or they collapse.
- `ScrollView` inside a `flex: 1` parent is usually what you want for forms.
- Do not nest a `ScrollView` and a `FlatList` that both scroll vertically.
- `onPress` belongs on `Pressable` / `TouchableOpacity`, not on `View` (unless you wrap it).
- Styling arrays are evaluated left to right; later styles override earlier ones.
- Reload with `r` in the Expo terminal after adding a native package, or restart with `--clear`.

---

## 16. Firebase

Full walkthrough: [`docs/firebase.md`](docs/firebase.md).

```bash
npx expo install firebase @react-native-async-storage/async-storage
```

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Add a **Web** app and copy the config keys.
3. Enable **Email/Password** auth, plus Firestore / Storage if you need them.
4. Put keys in `.env` as `EXPO_PUBLIC_FIREBASE_...` (see [`.env.example`](.env.example)).
5. Copy [`examples/firebase.js`](examples/firebase.js) to `src/auth/firebase.js`.

Use `initializeAuth` with AsyncStorage so the user stays signed in. Do not call `getAuth()` in Expo.

```js
const auth = initializeAuth(app, {
  persistence:
    Platform.OS === 'web'
      ? browserLocalPersistence
      : getReactNativePersistence(AsyncStorage),
});
```

Sign up / in / out:

```js
await createUserWithEmailAndPassword(auth, email, password);
await signInWithEmailAndPassword(auth, email, password);
await signOut(auth);
```

Watch auth state with [`examples/AuthContext.js`](examples/AuthContext.js):

```js
onAuthStateChanged(auth, (user) => setUser(user));
```

---

## 17. Reusable examples

Copy these into `src/components/`:

| File | What it is |
| --- | --- |
| [`examples/Button.js`](examples/Button.js) | Primary, secondary, outline, ghost, icon buttons |
| [`examples/TextField.js`](examples/TextField.js) | Label + input + error text |
| [`examples/Card.js`](examples/Card.js) | Tappable card |
| [`examples/Screen.js`](examples/Screen.js) | Safe area screen wrapper |
| [`examples/theme.js`](examples/theme.js) | Colors, spacing, type |
| [`examples/firebase.js`](examples/firebase.js) | Firebase Auth + Firestore + Storage init |
| [`examples/AuthContext.js`](examples/AuthContext.js) | Keep the user signed in |

Quick mental model:

```text
Screen (SafeAreaView + padding)
  └─ header / title
  └─ content (ScrollView or FlatList)
       └─ Card / TextField / rows
  └─ primary Button at the bottom
```
