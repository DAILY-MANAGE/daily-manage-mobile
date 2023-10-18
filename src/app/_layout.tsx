import { Stack } from "expo-router";

export default function AppLayout() {
  return(
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
      <Stack.Screen name="equipe" options={{ headerShown: false }}/>
      <Stack.Screen name="notificacoes" options={{ headerShown: false }}/>
    </Stack>
  );
}