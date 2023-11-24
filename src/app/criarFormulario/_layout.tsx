import { Stack } from "expo-router"
import React from "react"
import { StyleSheet } from "react-native"
import BackButton from "../components/BackButton"
import HeaderRightIcons from "../components/HeaderRight"

export default function CriarFormularioLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Criar Formulário",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          headerLeft: () => (<BackButton />),
          headerRight: () => (<HeaderRightIcons />),
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "500",
    color: "white",
  },
  headerStyle: {
    backgroundColor: "#1C1C1C"
  },
})