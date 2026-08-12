# Navigation cheatsheet

React Navigation stack (matches Expo apps that are not using Expo Router).

## Install

```bash
npx expo install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-gesture-handler react-native-safe-area-context
```

## Root setup

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Screen props

Every screen receives `navigation` and `route`:

```jsx
export default function DetailsScreen({ navigation, route }) {
  const { id } = route.params;
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Text>Back from {id}</Text>
    </Pressable>
  );
}
```

## Common actions

```js
navigation.navigate('Details', { id: '123' }); // push or jump to existing
navigation.push('Details', { id: '456' });     // always push a new screen
navigation.goBack();
navigation.replace('SignIn');                  // no back to previous
navigation.popToTop();                         // back to first screen
```

## Pass data

```js
navigation.navigate('EditProfile', {
  name: user.name,
  email: user.email,
});
```

```js
const { name, email } = route.params ?? {};
```

## Conditional auth stack

```jsx
{user ? (
  <Stack.Screen name="Home" component={HomeScreen} />
) : (
  <Stack.Screen name="SignIn" component={SignInScreen} />
)}
```

When `user` changes, React Navigation swaps the screens automatically.

## Header with a custom back button

If `headerShown` is true:

```jsx
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  options={{ title: 'Property' }}
/>
```

If you hide the header, build your own:

```jsx
<Pressable onPress={() => navigation.goBack()} hitSlop={12}>
  <Ionicons name="chevron-back" size={24} color="#111827" />
</Pressable>
```
