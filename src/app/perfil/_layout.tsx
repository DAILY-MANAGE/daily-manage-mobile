import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';
import { DadosUsuario } from "../equipe/(tabs)/usuarios";

export default function PerfilLayout() {
 return (
  <Stack>
   <Stack.Screen
    name="index"
    options={{
     headerTitle: 'Perfil',
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