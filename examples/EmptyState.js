import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { colors, type } from './theme';

/**
 * <EmptyState
 *   icon="home-outline"
 *   title="No properties yet"
 *   message="When you save a listing it will show up here."
 *   actionLabel="Browse properties"
 *   onAction={onBrowse}
 * />
 */
export default function EmptyState({ icon = 'file-tray-outline', title, message, actionLabel, onAction }) {
  return (
    <View style={styles.wrap}>
      <Ionicons name={icon} size={40} color={colors.muted} />
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} style={{ alignSelf: 'stretch' }} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 8,
  },
  title: {
    ...type.title,
    fontSize: 20,
    textAlign: 'center',
  },
  message: {
    ...type.subtitle,
    textAlign: 'center',
    marginBottom: 8,
  },
});
