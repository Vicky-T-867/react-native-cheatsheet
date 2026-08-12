# Extra auth: reset password, Google, Apple, SecureStore

Base email/password setup is in [`firebase.md`](firebase.md).

## Forgot password

```js
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';

await sendPasswordResetEmail(auth, email.trim());
Alert.alert('Check your email', 'We sent a reset link.');
```

## Verify email

```js
import { sendEmailVerification } from 'firebase/auth';

await sendEmailVerification(auth.currentUser);
```

```js
await auth.currentUser.reload();
const verified = auth.currentUser.emailVerified;
```

## Tokens belong in SecureStore, not AsyncStorage

AsyncStorage is fine for theme / onboarding. Put session secrets in SecureStore:

```bash
npx expo install expo-secure-store
```

```js
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('token', token);
const token = await SecureStore.getItemAsync('token');
await SecureStore.deleteItemAsync('token');
```

Firebase Auth persistence already stores the session. Use SecureStore if you add your own API tokens.

## Google sign-in (Expo)

```bash
npx expo install expo-auth-session expo-web-browser expo-crypto
```

Enable **Google** in Firebase Authentication, then use `expo-auth-session` / Google provider. You must add your SHA-1 (Android) and the Expo / iOS client IDs in Google Cloud.

```js
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const credential = GoogleAuthProvider.credential(idToken);
await signInWithCredential(auth, credential);
```

## Apple sign-in (iOS)

Required if you also offer Google on iOS (App Store rule).

```bash
npx expo install expo-apple-authentication
```

```js
import * as AppleAuthentication from 'expo-apple-authentication';
import { OAuthProvider, signInWithCredential } from 'firebase/auth';

const apple = await AppleAuthentication.signInAsync({
  requestedScopes: [
    AppleAuthentication.AppleAuthenticationScope.EMAIL,
    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  ],
});

const provider = new OAuthProvider('apple.com');
const credential = provider.credential({ idToken: apple.identityToken });
await signInWithCredential(auth, credential);
```

Needs an EAS iOS build and the Apple sign-in capability. Expo Go is limited here.
