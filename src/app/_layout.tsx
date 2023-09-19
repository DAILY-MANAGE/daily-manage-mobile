import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
        <Stack.Screen name="(login)" options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
    </Stack>
  );
}
