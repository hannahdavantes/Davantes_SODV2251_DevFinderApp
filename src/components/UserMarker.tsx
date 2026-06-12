import { Image, StyleSheet } from "react-native";
import { useState } from "react";
import { theme } from "../constants/theme";

type Props = {
  username: string;
  isCurrentUser?: boolean;
};

const UserMarker = ({ username, isCurrentUser }: Props) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      source={
        hasError
          ? require("../../assets/default-avatar.png")
          : { uri: `https://github.com/${username}.png` }
      }
      style={[styles.avatar, isCurrentUser && styles.currentUserAvatar]}
      resizeMode="cover"
      onError={() => setHasError(true)}
    />
  );
};

export default UserMarker;

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: theme.colors.primaryDark,
  },
  currentUserAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: theme.colors.tertiary,
    shadowColor: theme.colors.tertiary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
});
