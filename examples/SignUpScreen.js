import { useState } from 'react';
import { Text, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import Screen from './Screen';
import TextField from './TextField';
import Button from './Button';
import { signUp, authErrorMessage } from './auth';
import { type } from './theme';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!email || !password) {
      Alert.alert('Missing details', 'Enter email and password.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
    } catch (error) {
      Alert.alert('Sign up failed', authErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen>
        <Text style={type.title}>Create account</Text>
        <Text style={type.subtitle}>You can sign in on this phone after this.</Text>

        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          keyboardType="email-address"
        />
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="At least 6 characters"
          secureTextEntry
        />
        <TextField
          label="Confirm password"
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Repeat password"
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button label="Sign up" onPress={handleSignUp} />
        )}

        <Pressable onPress={() => navigation.navigate('SignIn')} hitSlop={8}>
          <Text style={{ ...type.subtitle, textAlign: 'center' }}>
            Already have an account? <Text style={{ color: '#2563EB', fontWeight: '600' }}>Sign in</Text>
          </Text>
        </Pressable>
      </Screen>
    </KeyboardAvoidingView>
  );
}
