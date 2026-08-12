# Buttons

Quick recipes. Copy from here, or use [`examples/Button.js`](../examples/Button.js).

## Which component?

| Need | Use |
| --- | --- |
| Custom look (color, radius, padding) | `Pressable` |
| Simple fade on tap | `TouchableOpacity` |
| System default, no custom layout | `Button` |
| Whole card / row is tappable | Wrap the row in `Pressable` |

## Primary

```jsx
<Pressable onPress={onNext} style={styles.primary}>
  <Text style={styles.primaryText}>Continue</Text>
</Pressable>
```

```js
primary: {
  backgroundColor: '#2563EB',
  minHeight: 48,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 16,
},
primaryText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},
```

## Secondary

```jsx
<Pressable onPress={onCancel} style={styles.secondary}>
  <Text style={styles.secondaryText}>Cancel</Text>
</Pressable>
```

```js
secondary: {
  backgroundColor: '#FFFFFF',
  minHeight: 48,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  alignItems: 'center',
  justifyContent: 'center',
},
secondaryText: {
  color: '#111827',
  fontSize: 16,
  fontWeight: '600',
},
```

## Outline

```js
outline: {
  backgroundColor: 'transparent',
  minHeight: 48,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#2563EB',
  alignItems: 'center',
  justifyContent: 'center',
},
outlineText: {
  color: '#2563EB',
  fontSize: 16,
  fontWeight: '600',
},
```

## Text / ghost (back, skip)

```jsx
<Pressable onPress={() => navigation.goBack()} hitSlop={12}>
  <Text style={{ color: '#2563EB', fontWeight: '600' }}>Back</Text>
</Pressable>
```

`hitSlop` makes the tap target larger without changing the layout.

## Icon button

```jsx
import { Ionicons } from '@expo/vector-icons';

<Pressable onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={8}>
  <Ionicons name="chevron-back" size={24} color="#111827" />
</Pressable>
```

```js
iconBtn: {
  width: 44,
  height: 44,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 22,
},
```

## Two buttons in a row

```jsx
<View style={{ flexDirection: 'row', gap: 12 }}>
  <Pressable style={[styles.secondary, { flex: 1 }]} onPress={onSkip}>
    <Text style={styles.secondaryText}>Skip</Text>
  </Pressable>
  <Pressable style={[styles.primary, { flex: 1 }]} onPress={onNext}>
    <Text style={styles.primaryText}>Next</Text>
  </Pressable>
</View>
```

## Sticky footer button

Keep the main action at the bottom of the screen:

```jsx
<View style={{ flex: 1 }}>
  <ScrollView style={{ flex: 1 }}>{/* form fields */}</ScrollView>

  <View style={{ padding: 16 }}>
    <Pressable style={styles.primary} onPress={onSubmit}>
      <Text style={styles.primaryText}>Save</Text>
    </Pressable>
  </View>
</View>
```

## Disabled + loading

```jsx
<Pressable
  disabled={!canSubmit || saving}
  onPress={onSubmit}
  style={[styles.primary, (!canSubmit || saving) && { opacity: 0.5 }]}
>
  {saving ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryText}>Submit</Text>}
</Pressable>
```

## Pressed state (Pressable)

```jsx
<Pressable
  onPress={onPress}
  style={({ pressed }) => [styles.primary, pressed && { opacity: 0.8 }]}
>
  <Text style={styles.primaryText}>Continue</Text>
</Pressable>
```
