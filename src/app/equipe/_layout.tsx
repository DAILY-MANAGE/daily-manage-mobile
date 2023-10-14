import { Stack } from "expo-router";

export default function EquipeLayout() {
 return(
  <Stack>
   <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
 );
}