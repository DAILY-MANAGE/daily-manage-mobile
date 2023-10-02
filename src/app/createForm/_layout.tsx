import { Stack } from "expo-router";

export default function CreateFormLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, title: "Crição do Formulário", headerBackButtonMenuEnabled: true }} />
    </Stack>
  );
}