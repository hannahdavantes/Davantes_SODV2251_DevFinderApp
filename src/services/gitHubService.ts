//Interface representing the GitHub user fields we use in this app
export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

//Fetches a single GitHub user by username
//Throws an error if the username is not found or something went wrong witht the request
export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (response.status === 404) {
    throw new Error("GitHub user not found. Check the username and try again.");
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data: GitHubUser = await response.json();
  return data;
}
