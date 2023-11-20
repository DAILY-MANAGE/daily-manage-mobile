import { Stack } from "expo-router";

export default function AppLayout() {
  return(
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
      <Stack.Screen name="equipes/(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="notificacoes" options={{ headerShown: false }}/>
      <Stack.Screen name="equipe/(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="criarFormulario" options={{ headerShown: false }}/>
      <Stack.Screen name="(formulario)/editar" options={{ headerShown: false }}/>
      <Stack.Screen name="(formulario)/responder" options={{ headerShown: false }}/>
      <Stack.Screen name="perfil" options={{ headerShown: false }}/>
    </Stack>
  );
}