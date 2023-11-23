import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import BackButton from "../components/BackButton";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }} />
      <Stack.Screen
        name="cadastro"
        options={{
          headerTitle: 'Cadastre-se',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (<BackButton />),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#1C1C1C",
  },
  headerTitleStyle: {
    fontWeight: "900",
    color: "#FFFFFF"
  }
});