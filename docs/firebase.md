# Firebase setup (Expo)

Use the **Firebase JS SDK** in Expo (not `@react-native-firebase/*`). That matches this cheatsheet and typical Expo apps.

You get:

- **Auth** — email/password sign up, sign in, stay logged in
- **Firestore** — database
- **Storage** — photos / files

## 1. Create a Firebase project

1. Open [Firebase Console](https://console.firebase.google.com/).
2. **Add project** → name it → continue.
3. Skip Google Analytics if you do not need it.
4. Click the web icon **`</>`** to add an app. Nickname it `expo`.
5. Copy the config object (`apiKey`, `authDomain`, `projectId`, …).

## 2. Turn on the services you need

In the Firebase console:

| Service | Where | What to enable |
| --- | --- | --- |
| Authentication | Build → Authentication | Sign-in method → **Email/Password** |
| Firestore | Build → Firestore Database | Create database → start in **test mode** while learning |
| Storage | Build → Storage | Get started → test mode while learning |

Test mode is fine on a school project. Lock rules down before a real launch. See [Security rules](#9-security-rules).

## 3. Install packages

```bash
npx expo install firebase @react-native-async-storage/async-storage
```

`AsyncStorage` keeps the user signed in after they close the app.

## 4. Put keys in `.env`

Create `.env` in the project root. Expo only exposes vars that start with `EXPO_PUBLIC_`.

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXX
```

Add `.env` to `.gitignore` so keys are not committed:

```gitignore
.env
.env.*
```

Restart Expo after changing `.env` (`npx expo start --clear`).

## 5. Create `src/auth/firebase.js`

Copy [`examples/firebase.js`](../examples/firebase.js).

Important Expo detail: do **not** call `getAuth(app)`. Use `initializeAuth` with React Native persistence:

```js
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence:
    Platform.OS === 'web'
      ? browserLocalPersistence
      : getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
```

If you see `auth/already-initialized`, you imported this file twice or called `initializeAuth` / `getAuth` more than once. Keep **one** firebase module and import `{ auth, db, storage }` from it.

## 6. Auth: sign up, sign in, sign out

```js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

export async function signUp(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logOut() {
  await signOut(auth);
}
```

On a screen:

```jsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

async function handleSignIn() {
  try {
    await signIn(email.trim(), password);
  } catch (error) {
    Alert.alert('Sign in failed', error.message);
  }
}
```

## 7. Keep the user logged in

Listen once at the app root. Copy [`examples/AuthContext.js`](../examples/AuthContext.js).

```jsx
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user); // null when signed out
    setLoading(false);
  });
  return unsubscribe;
}, []);
```

Wrap `App` with the provider:

```jsx
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>{/* navigators */}</NavigationContainer>
    </AuthProvider>
  );
}
```

Show auth vs app screens from `user`:

```jsx
const { user, loading } = useAuth();

if (loading) return <ActivityIndicator />;
return user ? <HomeScreen /> : <SignInScreen />;
```

## 8. Firestore CRUD

```js
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
```

Create:

```js
await addDoc(collection(db, 'properties'), {
  title: '2-bed apartment',
  city: 'Wollongong',
  ownerId: user.uid,
  createdAt: serverTimestamp(),
});
```

Read one:

```js
const snap = await getDoc(doc(db, 'users', user.uid));
if (snap.exists()) {
  const data = snap.data();
}
```

Read many:

```js
const q = query(
  collection(db, 'properties'),
  where('city', '==', 'Wollongong')
);
const snap = await getDocs(q);
const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
```

Live updates (chat, lists):

```js
useEffect(() => {
  const q = query(collection(db, 'properties'), where('ownerId', '==', user.uid));
  const unsubscribe = onSnapshot(q, (snap) => {
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
  return unsubscribe;
}, [user.uid]);
```

Update / delete:

```js
await updateDoc(doc(db, 'users', user.uid), { name: 'Alex' });
await deleteDoc(doc(db, 'properties', propertyId));
```

Save a user profile right after sign up:

```js
import { doc, setDoc } from 'firebase/firestore';

await setDoc(doc(db, 'users', user.uid), {
  email: user.email,
  role: 'tenant',
  createdAt: serverTimestamp(),
});
```

## 9. Security rules

Replace test-mode rules before sharing the app.

Firestore example (logged-in users can read; users can write only their own doc):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Storage example:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 10. Upload a photo (Storage)

```bash
npx expo install expo-image-picker
```

```js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import * as ImagePicker from 'expo-image-picker';

async function pickAndUpload(userId) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.7,
  });
  if (result.canceled) return null;

  const uri = result.assets[0].uri;
  const response = await fetch(uri);
  const blob = await response.blob();

  const path = `uploads/${userId}/${Date.now()}.jpg`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, blob);
  return getDownloadURL(fileRef);
}
```

## 11. Common Firebase gotchas

- Restart Expo after editing `.env`.
- One `initializeAuth` per app. Import `auth` from your firebase module; do not call `getAuth()` elsewhere.
- `auth/invalid-api-key` → wrong or missing `EXPO_PUBLIC_FIREBASE_API_KEY`.
- `auth/operation-not-allowed` → Email/Password is not enabled in the console.
- `auth/invalid-email` / `auth/weak-password` → validate before calling Firebase.
- Firestore `permission-denied` → rules are blocking the request (or you are not signed in).
- Do not commit `.env`. `EXPO_PUBLIC_` keys are still visible in the app binary; protect data with **rules**, not by hiding the config.
