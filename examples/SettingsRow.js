import { Pressable, View, Text, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, type } from './theme';

/**
 * <SettingsRow label="Email" value="a@b.com" onPress={...} />
 * <SettingsRow label="Notifications" toggle value={on} onValueChange={setOn} />
 * <SettingsRow label="Log out" danger onPress={logOut} />
 */
export default function SettingsRow({
  label,
  value,
  onPress,
  toggle = false,
  onValueChange,
  danger = false,
}) {
  const labelStyle = [styles.label, danger && { color: colors.danger }];

  if (toggle) {
    return (
      <View style={styles.row}>
        <Text style={labelStyle}>{label}</Text>
        <Switch value={Boolean(value)} onValueChange={onValueChange} />
      </View>
    );
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}>
      <Text style={labelStyle}>{label}</Text>
      <View style={styles.right}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        {danger ? null : <Ionicons name="chevron-forward" size={18} color={colors.muted} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 52,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    ...type.body,
    flex: 1,
  },
  value: {
    ...type.subtitle,
    fontSize: 14,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
