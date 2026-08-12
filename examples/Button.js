import { ActivityIndicator, Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, type } from './theme';

/**
 * Reusable button.
 *
 * <Button label="Continue" onPress={handleNext} />
 * <Button label="Cancel" variant="secondary" onPress={onCancel} />
 * <Button label="Delete" variant="outline" onPress={onDelete} />
 * <Button label="Skip" variant="ghost" onPress={onSkip} />
 * <Button icon="chevron-back" variant="ghost" onPress={navigation.goBack} />
 * <Button label="Save" loading disabled={saving} onPress={onSave} />
 */
export default function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
}) {
  const isDisabled = disabled || loading;
  const palette = variants[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: palette.bg, borderColor: palette.border, borderWidth: palette.border ? 1 : 0 },
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={20} color={palette.fg} /> : null}
          {label ? <Text style={[styles.label, { color: palette.fg }]}>{label}</Text> : null}
        </>
      )}
    </Pressable>
  );
}

const variants = {
  primary: { bg: colors.primary, fg: colors.primaryText, border: null },
  secondary: { bg: colors.card, fg: colors.text, border: colors.border },
  outline: { bg: 'transparent', fg: colors.primary, border: colors.primary },
  ghost: { bg: 'transparent', fg: colors.text, border: null },
};

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    ...type.button,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
