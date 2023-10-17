import { Stack } from "expo-router";
import { setIsLoggedIn } from "./(auth)";
import { View } from "react-native";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="provider" options={{ headerShown: false }} />
    </Stack>
  );
}
