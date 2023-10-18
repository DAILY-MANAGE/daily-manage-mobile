import { Stack } from "expo-router";
import React from "react";

export default function NotificacoesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Notificações",
          headerTitleStyle: { fontWeight: "900" },
        }}
      />
    </Stack>
  );
}
