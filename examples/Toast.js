import { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export default function Toast({ message, onHide, duration = 2000 }) {
  useEffect(() => {
    if (!message) return undefined;
    const id = setTimeout(onHide, duration);
    return () => clearTimeout(id);
  }, [message, duration, onHide]);

  if (!message) return null;

  return <Text style={styles.toast}>{message}</Text>;
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#111827',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
});
