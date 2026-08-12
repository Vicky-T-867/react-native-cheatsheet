# Run the app on your phone

This cheatsheet is **recipes**, not an installable app. You put the recipes into an **Expo** project, then open that project on your phone.

Two ways:

| Goal | Use |
| --- | --- |
| See it on your phone while you code | **Expo Go** (fast, no App Store) |
| Install like a normal app / send to a friend | **EAS Build** (APK / TestFlight) |

Start with Expo Go.

---

## 0. One-time setup on your computer

You need **Node.js** (LTS) from [nodejs.org](https://nodejs.org/).

Check:

```bash
node -v
npm -v
```

If those print version numbers, you are ready.

---

## 1. Create a mobile app project

```bash
npx create-expo-app@latest MyApp
cd MyApp
npx expo start
```

A terminal QR code appears. Leave this running.

You already have a real app (TenantVoice capstone). Skip create, and from that folder run:

```bash
cd /Users/wingyitsoi/tenantapp_casptone_project-latest
npx expo start
```

---

## 2. Install Expo Go on the phone

- **iPhone:** App Store → search **Expo Go**
- **Android:** Play Store → search **Expo Go**

Phone and computer must be on the **same Wi‑Fi**.

---

## 3. Open the project on the phone

### iPhone

1. Open the **Camera** app.
2. Point it at the QR code in the terminal.
3. Tap the banner → it opens in Expo Go.

If Camera does nothing, open Expo Go → **Scan QR code**.

### Android

1. Open **Expo Go**.
2. Tap **Scan QR code**.
3. Scan the terminal QR code.

The app loads on the phone. When you save a file on the computer, the phone reloads.

| Key in the Expo terminal | What it does |
| --- | --- |
| `r` | Reload |
| `j` | Open debugger |
| Ctrl+C | Stop the server |

---

## 4. If the phone cannot connect

Try in this order:

```bash
npx expo start --tunnel
```

Then scan the **new** QR code.

Also check:

- Computer and phone on the same Wi‑Fi (not phone hotspot vs home Wi‑Fi mismatch).
- Guest Wi‑Fi sometimes blocks devices talking to each other — use the main network.
- Firewall: allow Node / Expo.
- iOS: you must use the **Expo Go** app, not Safari.

---

## 5. iOS Simulator / Android emulator (optional)

On a Mac, with Xcode installed:

```bash
npx expo start
# press i
```

Android Studio emulator:

```bash
npx expo start
# press a
```

A real phone is still the best test (keyboard, camera, notifications).

---

## 6. Installable app (no Expo Go)

When you want an icon on the home screen that works without the Expo terminal:

```bash
npm install -g eas-cli
eas login
eas build:configure
```

Android (easiest to share — you get an APK / AAB):

```bash
eas build --platform android --profile preview
```

When the build finishes, Expo gives a download link. Send that to your phone and install it.

iOS (needs an Apple Developer account, paid):

```bash
eas build --platform ios --profile preview
```

Then install via TestFlight, or a device build if you register the phone’s UDID.

Set the name and icon in `app.json` before building:

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "icon": "./assets/icon.png",
    "ios": { "bundleIdentifier": "com.yourname.myapp" },
    "android": { "package": "com.yourname.myapp" }
  }
}
```

App Store / Play Store later:

```bash
eas submit --platform ios
eas submit --platform android
```

---

## What to copy from this cheatsheet

After `create-expo-app`:

1. Copy `examples/Button.js`, `TextField.js`, `Screen.js`, `theme.js` into `src/components/`.
2. Install Firebase if you need accounts: see [`firebase.md`](firebase.md).
3. Copy `examples/SignInScreen.js` and `examples/SignUpScreen.js` when you add those screens.
4. Run `npx expo start` and open Expo Go on your phone.

You do **not** run this cheatsheet repo on a phone. It has no `App.js`. You run **your Expo project**.
