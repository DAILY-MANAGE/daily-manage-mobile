import { Stack } from "expo-router";

export default function CreateFormLayout() {
 return( 
   <Stack>
     <Stack.Screen name="index" options={{ headerShown: true, title: "Crição do Formulário", presentation: 'formSheet', headerBackButtonMenuEnabled: true }}/>
    </Stack>
 );
}