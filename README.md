# DevFinder

A React Native mobile app for a community of mobile app developers — sign in with your GitHub username, view community members on a map, and browse their GitHub profiles.

Built for **SODV2251 — Mobile Application Development**, Project 2: *Write User Interfaces by Demonstrating Attention to Detail*.

---

## Features

- **Sign in with GitHub** — enter a GitHub username, validated against the GitHub API, persisted locally so you stay signed in
- **Community map** — see other developers as avatar markers on a map of Alberta
- **User popups** — tap a marker to see a quick info card with a "View Profile" action
- **Profile view** — opens the selected user's real GitHub profile page
- **Your location** — a distinct, larger marker shows your own position on the map
- **Map controls** — recenter to your location, and log out

---

## Tech Stack

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) (SDK 54, managed workflow)
- TypeScript
- [React Navigation](https://reactnavigation.org/) (Native Stack)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) (Google Maps)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) for local session persistence
- [GitHub REST API](https://docs.github.com/en/rest/users/users) for user data

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

  data/
    mockUsers.ts         Mock community member data

  types/
    User.ts              Shared type definitions

  constants/
    theme.ts             Colors, spacing, typography, border radius
```

---

## Known Limitations

- **Android marker clipping**: avatar images inside map markers don't render as perfect circles on Android due to a `react-native-maps` platform limitation. iOS renders correctly.
- **Hardcoded location**: the "your location" marker uses a fixed coordinate (Calgary) rather than real GPS, to keep the project focused on UI, navigation, and state.
- A brief flash of the sign-in form may appear on cold start before the saved session is checked.

---

## Future Work (Project 3)

- Replace mock community data with a real backend (JSON-Server or similar)
- Real GPS-based location via `expo-location`
- Full user registration flow
