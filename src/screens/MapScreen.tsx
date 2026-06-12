import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
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

export default function MapScreen() {
  const insets = useSafeAreaInsets();

  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Map">>();

  async function handleLogout() {
    await AsyncStorage.removeItem("gitHubUsername");
    navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.statusBarInset, { height: insets.top }]} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.269,
          longitude: -113.8116,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
      >
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
      <Pressable
        style={[styles.logoutButton, { top: insets.top + theme.spacing.sm }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>

      {selectedUser && (
        <UserPopup
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onViewProfile={() => {
            navigation.navigate("Profile", { username: selectedUser.username });
          }}
        />
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
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  logoutButtonText: {
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily,
    fontWeight: "700",
    fontSize: theme.typography.sm,
  },
});
