import { useRouter } from "expo-router"
import { Pressable, View, StyleSheet } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function HeaderRightIcons() {
 const router = useRouter()

 return (
  <View style={styles.headerIconsStyle}>
   <Pressable onPress={() => router.push('notificacoes')}>
    {({ pressed }) => (
     <FontAwesome
      name="bell"
      size={20}
      style={{
       color: "white",
       marginRight: 15,
       opacity: pressed ? 0.5 : 1,
      }}
     />
    )}
   </Pressable>
   <Pressable onPress={() => router.push('perfil')}>
    {({ pressed }) => (
     <FontAwesome
      name="user"
      size={24}
      style={{
       color: "white",
       marginRight: 15,
       opacity: pressed ? 0.5 : 1,
      }}
     />
    )}
   </Pressable>
  </View>
 )
}

const styles = StyleSheet.create({
 headerIconsStyle: {
  height: "auto",
  width: "auto",
  flexDirection: "row",
  gap: 2,
  alignItems: "center",
  justifyContent: "center",
 },
})