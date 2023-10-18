import { Stack } from "expo-router";

export default function CadastroLayout() {
 return (
  <Stack>
   <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
 );
}