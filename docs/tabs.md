# Bottom tabs

Most apps have Home / Search / Messages / Profile along the bottom.

```bash
npx expo install @react-navigation/bottom-tabs
```

```jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home-outline',
            Messages: 'mail-outline',
            Profile: 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Messages" component={ChatListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

Put tabs **inside** the stack, after sign-in:

```text
NavigationContainer
  Stack
    SignIn
    MainTabs          ← bottom tabs live here
      Home
      Messages
      Profile
    Details           ← opened from a tab, hides the tab bar if it is a stack screen
```

```jsx
<Stack.Navigator screenOptions={{ headerShown: false }}>
  {!user ? (
    <Stack.Screen name="SignIn" component={SignInScreen} />
  ) : (
    <>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </>
  )}
</Stack.Navigator>
```

Navigate from a tab screen to a stack screen:

```js
navigation.navigate('Details', { id });
```
