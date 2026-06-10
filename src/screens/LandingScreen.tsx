import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type GitHubUser, fetchGitHubUser } from "../services/gitHubService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

export default function LandingScreen() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Landing">>();

  useEffect(() => {
    async function checkExistingUser() {
      const username = await AsyncStorage.getItem("gitHubUsername");
      if (username) {
        navigation.navigate("Map");
      }
    }

    checkExistingUser();
  }, []);

  async function handleSubmit() {
    //Make sure username is not empty
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }

    //Reset error/loading state
    setError("");
    setIsLoading(true);

    try {
      //Check if GitHub user exist
      const gitHubUser: GitHubUser = await fetchGitHubUser(username);
      //If it exists, then we save on AsyncStorage
      await AsyncStorage.setItem("gitHubUsername", username);
      //Navigate to Map
      navigation.navigate("Map");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>DevFinder</Text>
        <Text style={styles.subtitle}>Connect with developers near you</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your GitHub username"
          placeholderTextColor={theme.colors.gray6}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {isLoading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Join Community</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryDark,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.xxxl,
    fontWeight: "bold",
    color: theme.colors.secondaryDark,
    marginBottom: theme.spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.md,
    color: theme.colors.tertiaryLight,
    marginBottom: theme.spacing.xl,
    textAlign: "center",
  },
  input: {
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    borderRadius: 8,
    padding: 14,
    fontSize: theme.typography.md,
    marginBottom: theme.spacing.sm,
  },
  errorText: {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.secondaryLight,
    fontSize: theme.typography.sm,
    marginBottom: theme.spacing.sm,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.white,
    fontSize: theme.typography.md,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  loader: {
    marginTop: theme.spacing.sm,
  },
});
