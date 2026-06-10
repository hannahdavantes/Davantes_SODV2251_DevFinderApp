import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { mockUsers } from "../data/mockUsers";
import { theme } from "../constants/theme";

export default function MapScreen() {
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
            title={user.name}
            description={user.username}
          />
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
