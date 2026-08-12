# Layout cheatsheet

React Native layout is Flexbox. Default direction is **column**.

## Fill the screen

```js
{ flex: 1 }
```

Put `flex: 1` on the outermost `View` of every screen.

## Padding and gap

```jsx
<View style={{ flex: 1, padding: 24, gap: 12 }}>
  <Text>Title</Text>
  <Text>Subtitle</Text>
</View>
```

## Row vs column

```js
{ flexDirection: 'column' } // default, stacked
{ flexDirection: 'row' }    // side by side
```

## Alignment

On a **column** layout:

| Prop | Moves children |
| --- | --- |
| `justifyContent` | vertically (top / center / space-between) |
| `alignItems` | horizontally (left / center / stretch) |

On a **row** layout those axes swap.

## Center on screen

```js
{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
```

## Space between header and footer

```jsx
<View style={{ flex: 1, justifyContent: 'space-between', padding: 24 }}>
  <Text>Header</Text>
  <Pressable><Text>Continue</Text></Pressable>
</View>
```

## Equal-width buttons

```jsx
<View style={{ flexDirection: 'row', gap: 12 }}>
  <View style={{ flex: 1 }}>{/* left button */}</View>
  <View style={{ flex: 1 }}>{/* right button */}</View>
</View>
```

## Absolute overlay (badge, close button)

```js
{
  position: 'absolute',
  top: 12,
  right: 12,
}
```

Parent needs `position: 'relative'` only if you are used to CSS. In RN, `absolute` is relative to the nearest parent.

## Shadows

```js
Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  android: {
    elevation: 3,
  },
})
```
