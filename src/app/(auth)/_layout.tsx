import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

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
          headerTitle: 'Cadastro',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle
        }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#FFFFFF"
  },
  headerTitleStyle: {
    fontWeight: "900",
  }
});