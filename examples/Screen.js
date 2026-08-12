import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from './theme';

/**
 * Full-screen wrapper with safe area + optional scrolling.
 *
 * <Screen>
 *   <Text>Hello</Text>
 * </Screen>
 *
 * <Screen scroll={false}>
 *   <FlatList ... />
 * </Screen>
 */
export default function Screen({ children, scroll = true, style }) {
  return (
    <SafeAreaView style={[styles.safe, style]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    gap: spacing.md,
  },
});
