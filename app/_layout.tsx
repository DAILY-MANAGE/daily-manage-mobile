import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AppLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        {/*  <Stack.Screen
                    name="login"
                    options={{ presentation: "formSheet" }}
                /> */}
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, headerLargeTitle: true }}
        />
        {/*         <Stack.Screen name="createForm" options={{ presentation: "modal" }} /> */}
{/*         <Stack.Screen name="form" options={{ presentation: "modal" }} /> */} 
      </Stack>
    </SafeAreaProvider>
  );
}
