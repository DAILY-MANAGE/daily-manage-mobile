import { Stack } from "expo-router"
import BackButton from "../../components/BackButton"
import { StyleSheet } from "react-native"
import React from "react"
import HeaderRightIcons from "../../components/HeaderRight"

export default function ResponderFormularioLayout() {
 return (
  <Stack>
   <Stack.Screen
    name="index"
    options={{
     headerTitle: "Responder formulário",
     headerStyle: styles.headerStyle,
     headerTitleStyle: styles.headerTitleStyle,
     headerLeft: () => (<BackButton />),
     headerRight: () => (<HeaderRightIcons />),
    }} />
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