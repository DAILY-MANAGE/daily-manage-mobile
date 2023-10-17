import { Stack } from "expo-router";

export default function LayoutProvider() {
 return (
  <Stack>
   <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
 );
}