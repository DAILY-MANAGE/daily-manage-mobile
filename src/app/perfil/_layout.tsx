import { Stack, useRouter } from "expo-router"
import { StyleSheet } from 'react-native'
import BackButton from "../components/BackButton"
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function PerfilLayout() {
  const router = useRouter()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Perfil',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (<BackButton />),
          headerRight: () => (
            <FontAwesome
              name="sign-out"
              color="red"
              size={24}
              onPress={() => router.replace("(auth)")}
            />
          )
        }} />
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#1C1C1C"
  },
  headerTitleStyle: {
    fontWeight: "900",
    color: "#FFFFFF"
  }
})