import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from 'react-native';

export default function NotificacoesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Notificações",
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "900"
  }
});