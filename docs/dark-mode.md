# Dark mode

Read the phone theme, and let the user override it.

```jsx
import { useColorScheme } from 'react-native';

const scheme = useColorScheme(); // 'light' | 'dark' | null
const colors = scheme === 'dark' ? dark : light;
```

Store a user choice:

```js
type ThemePref = 'system' | 'light' | 'dark';
```

```js
const system = useColorScheme();
const resolved = pref === 'system' ? system : pref;
```

Example palettes:

```js
export const light = {
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
};

export const dark = {
  background: '#111827',
  card: '#1F2937',
  text: '#F9FAFB',
  muted: '#9CA3AF',
  border: '#374151',
};
```

Put colors on a React context (same idea as Auth):

```jsx
<ThemeContext.Provider value={{ colors, pref, setPref }}>
  {children}
</ThemeContext.Provider>
```

Status bar:

```jsx
import { StatusBar } from 'expo-status-bar';

<StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
```

Do not hard-code `#FFFFFF` on every screen. Read `colors.background` from the theme.
