# DevFinder

A React Native mobile app for a community of mobile app developers — sign in with your GitHub username, view community members on a map, and browse their GitHub profiles.

Built for **SODV2251 — Mobile Application Development**, Project 2: *Write User Interfaces by Demonstrating Attention to Detail*.

---

## Features

- **Sign in with GitHub** — enter a GitHub username, validated against the GitHub API, persisted locally so you stay signed in
- **Saved profiles** — first-time sign-in creates a profile (username, name, GPS location) on the json-server backend
- **Community map** — see other developers as avatar markers, sourced live from the backend
- **User popups** — tap a marker to see a quick info card with a "View Profile" action
- **Profile view** — opens the selected user's real GitHub profile page
- **Your location** — a distinct, larger marker shows your own saved position on the map
- **Map controls** — recenter to your saved location, and log out

---

## Tech Stack

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) (SDK 54, managed workflow)
- TypeScript
- [React Navigation](https://reactnavigation.org/) (Native Stack)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) (Google Maps)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) for local session persistence
- [GitHub REST API](https://docs.github.com/en/rest/users/users) for user data
- [json-server](https://github.com/typicode/json-server) for the local profile/location backend
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) for real GPS coordinates

---

## Getting Started

### Prerequisites

- Node.js
- Java 17 (required for Gradle — Java 18 will cause build errors)
- Android Studio with an emulator configured, or a physical device
- A Google Maps API key (added to `app.json` under `android.config.googleMaps.apiKey`)

### Install dependencies

```bash
npm install
```

### Run the backend

The app reads/writes profiles via a local [json-server](https://github.com/typicode/json-server) backend, seeded from `db.json`. Start it in its own terminal:

```bash
npm run server
```

This binds to all network interfaces (`--host 0.0.0.0`) so it's reachable from a physical device, not just this machine, at `http://<your-LAN-IP>:3001/users`.

The app's base URL is configured in `src/constants/api.ts` — `localhost` only works from an iOS simulator, since a physical device or the Android emulator can't reach your machine's `localhost`:

- **Android emulator**: use `http://10.0.2.2:3001`
- **Physical device (e.g. Expo Go on a phone)**: use your machine's LAN IP, e.g. `http://192.168.1.23:3001` (find it with `ipconfig` on Windows; device and dev machine must be on the same Wi-Fi network, and the IP can change if you reconnect)

### Run the app

> **Note:** This app uses native modules (`react-native-maps`, `react-native-webview`) that are **not supported in Expo Go**. You must use a development build.

```bash
npx expo run:android
```

For iOS:

```bash
npx expo run:ios
```

After the first native build, fast refresh works for JS/TS changes. Only rebuild when `app.json` or native dependencies change.

---

## Project Structure

```
App.tsx

src/
  navigation/
    RootNavigator.tsx    Stack navigator setup (Landing, Map, Profile)
    types.ts             Typed navigation param list

  screens/
    LandingScreen.tsx    Sign-in / returning-user check
    MapScreen.tsx        Community map, markers, popups, controls
    ProfileScreen.tsx    GitHub profile WebView

  components/
    UserMarker.tsx       Avatar marker (with current-user variant)
    UserPopup.tsx        Marker tap popup

  services/
    gitHubService.ts     GitHub API calls
    userService.ts       json-server calls to read/create saved profiles
    locationService.ts   Device GPS location via expo-location

  types/
    User.ts              Shared type definitions

  constants/
    theme.ts             Colors, spacing, typography, border radius
    api.ts               Backend base URL

db.json                  json-server database (profiles, seeded with sample users)
```

---

## Known Limitations

- **Android marker clipping**: avatar images inside map markers don't render as perfect circles on Android due to a `react-native-maps` platform limitation. iOS renders correctly.
- **Local-only backend**: `db.json` lives on the dev machine, so the base URL in `src/constants/api.ts` needs adjusting per device (see "Run the backend" above).
- A brief flash of the sign-in form may appear on cold start before the saved session is checked.

---

## Future Work

- Full user registration flow (editable name/avatar, not just GitHub username lookup)
- Deploy the backend so it isn't tied to a single dev machine's IP
