import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors, radius, type } from './theme';

/**
 * Tappable card row.
 *
 * <Card title="2-bed apartment" subtitle="Wollongong" onPress={() => navigation.navigate('Details', { id })} />
 */
export default function Card({ title, subtitle, onPress, children }) {
  const content = (
    <>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.card}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 4,
  },
  pressed: {
    opacity: 0.85,
  },
  title: {
    ...type.body,
    fontWeight: '600',
  },
  subtitle: {
    ...type.subtitle,
    fontSize: 14,
  },
});
