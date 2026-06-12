import { StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { type GitHubUser, fetchGitHubUser } from "../services/gitHubService";
import { RootStackParamList } from "../navigation/types";
import { useEffect, useState } from "react";

type Props = {};
const ProfileScreen = (props: Props) => {
  const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
  const { username } = route.params;

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    //Reset error/loading state
    setError("");
    setIsLoading(true);

    const checkUser = async () => {
      try {
        //Check if GitHub user exist
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
    <View>
      <View>
        {isLoading && <Text>Loading...</Text>}
        {error && <Text>{error}</Text>}
        {user && <Text>{user.login}</Text>}
      </View>
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({});
