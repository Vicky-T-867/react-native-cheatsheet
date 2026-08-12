import { useState } from 'react';
import { Text, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import Screen from './Screen';
import TextField from './TextField';
import Button from './Button';
import { signIn, authErrorMessage } from './auth';
import { type } from './theme';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert('Missing details', 'Enter email and password.');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Sign in failed', authErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen>
        <Text style={type.title}>Sign in</Text>
        <Text style={type.subtitle}>Use the email you registered with.</Text>

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
          placeholder="Password"
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button label="Sign in" onPress={handleSignIn} />
        )}

        <Pressable onPress={() => navigation.navigate('SignUp')} hitSlop={8}>
          <Text style={{ ...type.subtitle, textAlign: 'center' }}>
            No account? <Text style={{ color: '#2563EB', fontWeight: '600' }}>Sign up</Text>
          </Text>
        </Pressable>
      </Screen>
    </KeyboardAvoidingView>
  );
}
