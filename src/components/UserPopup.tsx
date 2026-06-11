import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MockUser } from "../types/User";
import { theme } from "../constants/theme";

type Props = {
  user: MockUser;
  onClose: () => void;
  onViewProfile: () => void;
};

const UserPopup = ({ user, onClose, onViewProfile }: Props) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://github.com/${user.username}.png` }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name ?? user.username}
        </Text>
        <Text style={styles.username} numberOfLines={1}>
          @{user.username}
        </Text>
      </View>
      <View style={styles.buttons}>
        <Pressable
          style={[styles.button, styles.profileButton]}
          onPress={onViewProfile}
        >
          <Text style={styles.profileButtonText}>View Profile</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.closeButton]}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserPopup;

const AVATAR_SIZE = 80;

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: theme.spacing.md,
    right: theme.spacing.md,
    bottom: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: "center",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 3,
    borderColor: theme.colors.primaryLight,
    marginBottom: theme.spacing.md,
  },
  info: {
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  name: {
    fontSize: theme.typography.lg,
    fontFamily: theme.typography.fontFamily,
    fontWeight: "700",
    color: theme.colors.white,
  },
  username: {
    fontSize: theme.typography.sm,
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.gray5,
  },
  buttons: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.sm + 2,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
  },
  profileButton: {
    backgroundColor: theme.colors.secondary,
  },
  profileButtonText: {
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily,
    fontWeight: "700",
    fontSize: theme.typography.sm,
  },
  closeButton: {
    backgroundColor: theme.colors.primaryLight,
  },
  closeButtonText: {
    color: theme.colors.gray3,
    fontFamily: theme.typography.fontFamily,
    fontWeight: "600",
    fontSize: theme.typography.sm,
  },
});
