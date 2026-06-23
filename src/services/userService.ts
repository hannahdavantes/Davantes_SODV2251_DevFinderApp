import { MockUser } from "../types/User";
import { API_BASE_URL } from "../constants/api";

//Fetches every saved user profile (used to render all map markers)
export async function getUsers(): Promise<MockUser[]> {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`Failed to load users: ${response.status}`);
  }

  return response.json();
}

//Looks up a single saved user profile by GitHub username, or null if none exists
export async function getUser(username: string): Promise<MockUser | null> {
  const response = await fetch(
    `${API_BASE_URL}/users?username=${encodeURIComponent(username)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load user: ${response.status}`);
  }

  const matches: MockUser[] = await response.json();
  return matches[0] ?? null;
}

//Creates a new saved user profile
export async function createUser(user: MockUser): Promise<MockUser> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to create user: ${response.status}`);
  }

  return response.json();
}
