//Defines the screen routes and their accepted params for the app's stack navigator
export type RootStackParamList = {
  Landing: undefined;
  Map: undefined;
  Profile: { username: string };
};
