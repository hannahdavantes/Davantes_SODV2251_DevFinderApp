import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { mockUsers } from "../data/mockUsers";
import { MockUser } from "../types/User";
import { theme } from "../constants/theme";
import UserMarker from "../components/UserMarker";

export default function MapScreen() {
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const handleLoad = (username: string) => {
    //Give Android a couple of frames to finish laying out the
    //rounded view before freezing the marker bitmap.
    setTimeout(() => {
      setLoaded((prev) => ({ ...prev, [username]: true }));
    }, 300);
  };

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
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            centerOffset={{ x: 0, y: 0 }}
            onPress={() => setSelectedUser(user)}
            tracksViewChanges={!loaded[user.username]}
          >
            <UserMarker
              username={user.username}
              onLoad={() => handleLoad(user.username)}
            />
          </Marker>
        ))}
      </MapView>
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
