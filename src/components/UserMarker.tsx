import { Image, StyleSheet, View } from "react-native";
import { useState } from "react";
import { theme } from "../constants/theme";

type Props = {
  username: string;
  onLoad?: () => void;
};

const SIZE = 55;

const UserMarker = ({ username, onLoad }: Props) => {
  const [hasError, setHasError] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Image
        source={
          hasError
            ? require("../../assets/default-avatar.png")
            : { uri: `https://github.com/${username}.png` }
        }
        style={styles.avatar}
        resizeMode="cover"
        onError={() => setHasError(true)}
        onLoad={onLoad}
      />
    </View>
  );
};

export default UserMarker;

const styles = StyleSheet.create({
  wrapper: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 3,
    borderColor: theme.colors.primaryDark,
    overflow: "hidden",
    backgroundColor: theme.colors.primaryDark,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
