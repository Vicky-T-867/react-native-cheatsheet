# Search, refresh, and long lists

## Search bar

```jsx
<TextInput
  value={query}
  onChangeText={setQuery}
  placeholder="Search"
  autoCapitalize="none"
  autoCorrect={false}
  clearButtonMode="while-editing"
  style={styles.input}
/>
```

Filter a local list:

```js
const visible = items.filter((item) =>
  item.title.toLowerCase().includes(query.trim().toLowerCase())
);
```

Wait until the user stops typing (debounce) before hitting a server. Copy [`examples/useDebounce.js`](../examples/useDebounce.js):

```js
const debounced = useDebounce(query, 300);

useEffect(() => {
  if (!debounced) return;
  searchApi(debounced).then(setItems);
}, [debounced]);
```

## Pull to refresh

```jsx
<FlatList
  data={items}
  refreshing={refreshing}
  onRefresh={async () => {
    setRefreshing(true);
    await loadItems();
    setRefreshing(false);
  }}
  renderItem={...}
/>
```

## Infinite scroll (load more)

```jsx
<FlatList
  data={items}
  onEndReached={loadMore}
  onEndReachedThreshold={0.4}
  ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
/>
```

```js
async function loadMore() {
  if (loadingMore || !hasMore) return;
  setLoadingMore(true);
  const next = await fetchPage(page + 1);
  setItems((prev) => [...prev, ...next]);
  setPage((p) => p + 1);
  setHasMore(next.length > 0);
  setLoadingMore(false);
}
```

## Grouped list (Settings-style)

```jsx
import { SectionList } from 'react-native';

<SectionList
  sections={[
    { title: 'Account', data: ['Email', 'Password'] },
    { title: 'Support', data: ['Help', 'About'] },
  ]}
  keyExtractor={(item) => item}
  renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
  renderItem={({ item }) => <Text style={styles.row}>{item}</Text>}
/>
```

## Swipe a row (simple pattern)

React Native has no built-in swipe. Common approach: `react-native-gesture-handler` swipeable, or a **Delete** button inside the row for school apps.

```jsx
<Pressable onLongPress={() => confirmDelete(item.id)}>
  <Text>{item.title}</Text>
</Pressable>
```
