# Settings, toggles, and onboarding

## Settings row

Copy [`examples/SettingsRow.js`](../examples/SettingsRow.js).

```jsx
<SettingsRow label="Email" value="you@email.com" onPress={() => navigation.navigate('EditEmail')} />
<SettingsRow label="Notifications" toggle value={enabled} onValueChange={setEnabled} />
<SettingsRow label="Log out" danger onPress={logOut} />
```

## Switch (notifications, dark mode, privacy)

```jsx
import { Switch } from 'react-native';

<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  <Text>Push notifications</Text>
  <Switch value={enabled} onValueChange={setEnabled} />
</View>
```

Save the value with AsyncStorage or Firestore when it changes.

## Checkbox / radio

```jsx
<Pressable onPress={() => setAccepted((v) => !v)} style={{ flexDirection: 'row', gap: 8 }}>
  <Ionicons name={accepted ? 'checkbox' : 'square-outline'} size={22} color="#2563EB" />
  <Text>I agree to the terms</Text>
</Pressable>
```

Radio (one of many):

```jsx
{options.map((option) => (
  <Pressable key={option} onPress={() => setSelected(option)} style={{ flexDirection: 'row', gap: 8 }}>
    <Ionicons
      name={selected === option ? 'radio-button-on' : 'radio-button-off'}
      size={22}
      color="#2563EB"
    />
    <Text>{option}</Text>
  </Pressable>
))}
```

## Password show / hide

```jsx
<View>
  <TextInput secureTextEntry={!visible} value={password} onChangeText={setPassword} />
  <Pressable onPress={() => setVisible((v) => !v)} hitSlop={8}>
    <Ionicons name={visible ? 'eye-off' : 'eye'} size={20} color="#6B7280" />
  </Pressable>
</View>
```

## Onboarding (first-launch screens)

Show once, then skip forever:

```js
import AsyncStorage from '@react-native-async-storage/async-storage';

const seen = await AsyncStorage.getItem('onboardingComplete');
if (!seen) navigation.replace('Onboarding');
```

```js
await AsyncStorage.setItem('onboardingComplete', 'true');
navigation.replace('SignIn');
```

A simple 3-page onboarding is a `FlatList` with `pagingEnabled` and a Next / Skip button.
