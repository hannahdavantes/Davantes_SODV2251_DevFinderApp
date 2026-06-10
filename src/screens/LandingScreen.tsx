import { useState } from "react";
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

export default function LandingScreen() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    console.log("Submitted:", username);
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
    fontSize: theme.typography.xxl,
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
