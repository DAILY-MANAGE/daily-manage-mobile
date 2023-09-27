import { Stack } from "expo-router";

export default function FormLayout() {
 return (
   <Stack>
    <Stack.Screen name="index" options={{ headerShown: false, title: "Criação de Formulário" }}/>
   </Stack>
 );
}