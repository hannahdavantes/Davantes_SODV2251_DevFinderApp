import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { mockUsers } from "../data/mockUsers";
import { MockUser } from "../types/User";
import { theme } from "../constants/theme";
import UserMarker from "../components/UserMarker";
import UserPopup from "../components/UserPopup";

export default function MapScreen() {
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  return (
    <SafeAreaView style={styles.container}>
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

      {selectedUser && (
        <UserPopup
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onViewProfile={() => {}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryDark,
  },
  map: {
    flex: 1,
  },
});
