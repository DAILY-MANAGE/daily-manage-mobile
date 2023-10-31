import { Stack } from "expo-router";

export default function ResponderFormularioLayout() {
 return (
  <Stack>
   <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
 );
}