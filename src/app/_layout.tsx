import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./login";
import { useState } from "react";


export default function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <SafeAreaProvider>
      {!isLoggedIn && (
        <Login />
      )}
      {isLoggedIn && (
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, headerLargeTitle: true }}
          />
        </Stack>
      )}
    </SafeAreaProvider>
  );
}