import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { type GitHubUser, fetchGitHubUser } from "../services/gitHubService";
import { RootStackParamList } from "../navigation/types";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import WebView from "react-native-webview";
import { theme } from "../constants/theme";

type Props = {};

const ProfileScreen = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Profile">>();

  const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
  const { username } = route.params;

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setIsLoading(true);

    const checkUser = async () => {
      try {
        const gitHubUser: GitHubUser = await fetchGitHubUser(username);
        setUser(gitHubUser);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{username}</Text>
      </View>

      {/* States */}
      {isLoading && (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={theme.colors.tertiary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      )}

      {error && !isLoading && (
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* WebView */}
      {user && (
        <WebView source={{ uri: user.html_url }} style={styles.webView} />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryDark,
    top: theme.spacing.xxl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primaryLight,
  },
  backButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.primaryLight,
  },
  backButtonPressed: {
    backgroundColor: theme.colors.tertiary,
  },
  backButtonText: {
    color: theme.colors.offWhite,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sm,
  },
  headerTitle: {
    color: theme.colors.tertiary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.md,
    fontWeight: "bold",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
    backgroundColor: theme.colors.primaryDark,
  },
  loadingText: {
    color: theme.colors.gray4,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sm,
  },
  errorText: {
    color: theme.colors.secondaryLight,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sm,
    textAlign: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  webView: {
    flex: 1,
  },
});
