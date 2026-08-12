# Debugging and publishing

## Everyday debugging

| Action | How |
| --- | --- |
| Reload | `r` in the Expo terminal, or shake device → Reload |
| Open debugger | `j` in the Expo terminal (Chrome / Hermes) |
| Clear cache | `npx expo start --clear` |
| See red error | Read the **first** file + line in the stack, not the last |
| Log data | `console.log('user', user)` — shows in the Expo terminal |

Common fixes:

- **Text strings must be rendered within a `<Text>` component** → wrap the string in `<Text>`.
- **undefined is not an object (evaluating 'x.y')** → the parent is `null`. Use `x?.y`.
- **Network request failed** on a real phone → phone and computer must be on the same Wi‑Fi; or use a tunnel (`npx expo start --tunnel`).
- Package just installed but app crashes → stop Expo, run `npx expo start --clear`.

## Run on a real phone

1. Install **Expo Go** from the App Store / Play Store.
2. `npx expo start`
3. Scan the QR code (iOS Camera / Android Expo Go).

Same Wi‑Fi as your computer. If it fails, try `npx expo start --tunnel`.

## EAS Build (installable file, not Expo Go)

When you need custom native code, or you want a file to submit to the stores:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
eas build --platform ios --profile preview
```

`preview` builds an APK / internal iOS build you can install for testing.

Submit later:

```bash
eas submit --platform ios
eas submit --platform android
```

Set the app name, icon, and splash in `app.json`:

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#FFFFFF"
    },
    "ios": { "bundleIdentifier": "com.yourname.myapp" },
    "android": { "package": "com.yourname.myapp" }
  }
}
```

Icon: `1024×1024` PNG. Splash: usually `1284×2778` or a centered logo on a solid color.
