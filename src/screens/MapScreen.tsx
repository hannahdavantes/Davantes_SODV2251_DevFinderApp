import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { mockUsers } from "../data/mockUsers";
import { MockUser } from "../types/User";
import { theme } from "../constants/theme";
import UserMarker from "../components/UserMarker";
import UserPopup from "../components/UserPopup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_REGION = {
  latitude: 52.269,
  longitude: -113.8116,
  latitudeDelta: 8,
  longitudeDelta: 8,
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();

  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  const mapRef = useRef<MapView>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Map">>();

  async function handleLogout() {
    await AsyncStorage.removeItem("gitHubUsername");
    navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
  }

  function handleRecenter() {
    mapRef.current?.animateToRegion(DEFAULT_REGION, 1000);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.statusBarInset, { height: insets.top }]} />

      <MapView ref={mapRef} style={styles.map} initialRegion={DEFAULT_REGION}>
        {mockUsers.map((user) => (
          <Marker
            key={user.username}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            onPress={() => setSelectedUser(user)}
          >
            <UserMarker username={user.username} />
          </Marker>
        ))}
      </MapView>

      {selectedUser && (
        <UserPopup
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onViewProfile={() => {
            navigation.navigate("Profile", { username: selectedUser.username });
          }}
        />
      )}

      <Pressable
        style={[styles.logoutButton, { top: insets.top + theme.spacing.sm }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>

      {!selectedUser && (
        <Pressable style={styles.recenterButton} onPress={handleRecenter}>
          <Text style={styles.recenterButtonText}>Re-center</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  statusBarInset: {
    backgroundColor: theme.colors.primaryDark,
  },
  map: {
    flex: 1,
  },
  logoutButton: {
    position: "absolute",
    right: theme.spacing.md,
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  logoutButtonText: {
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily,
    fontWeight: "700" as const,
    fontSize: theme.typography.sm,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  recenterButton: {
    position: "absolute",
    left: theme.spacing.md,
    bottom: theme.spacing.xxl,
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  recenterButtonText: {
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily,
    fontWeight: "700" as const,
    fontSize: theme.typography.sm,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
