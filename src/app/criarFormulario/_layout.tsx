import { Stack } from "expo-router";

export default function CriarFormularioLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
