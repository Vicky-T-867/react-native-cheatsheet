# Keyboard

Forms on a phone: the keyboard covers the bottom button unless you handle it.

## Avoid the keyboard covering inputs

```jsx
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
  <ScrollView
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ padding: 24, gap: 12 }}
  >
    {/* TextInputs */}
  </ScrollView>
</KeyboardAvoidingView>
```

`keyboardShouldPersistTaps="handled"` lets the user tap a button while the keyboard is open.

## Dismiss keyboard when tapping outside

```jsx
import { Keyboard, Pressable } from 'react-native';

<Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
  {/* screen content */}
</Pressable>
```

Do not wrap `TextInput` itself in a Pressable that also dismisses, or taps may fight the input.

## Submit from the keyboard

```jsx
<TextInput
  returnKeyType="next"
  onSubmitEditing={() => passwordRef.current?.focus()}
/>

<TextInput
  ref={passwordRef}
  returnKeyType="done"
  onSubmitEditing={handleSignIn}
/>
```
