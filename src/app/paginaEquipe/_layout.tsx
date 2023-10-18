import { Stack } from "expo-router";
import React from "react";

export default function PaginaEquipeLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerTitle: 'Equipe', headerTitleStyle: { fontWeight: '900' } }} />
    </Stack>
  );
}
