import { Stack } from "expo-router"
import React from "react"
import { StyleSheet } from 'react-native'
import BackButton from '../components/BackButton/index'

export default function NotificacoesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Notificações",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (<BackButton />)
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#1C1C1C"
  },
  headerTitleStyle: {
    fontWeight: "500",
    color: "white",
  },
})