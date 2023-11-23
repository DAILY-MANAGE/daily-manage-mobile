import { useRouter } from "expo-router"
import { Pressable } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function BackButton() {
 const router = useRouter()

 return (
  <Pressable onPress={() => router.back()}>
   {({ pressed }) => (
    <FontAwesome
     name="arrow-left"
     size={20}
     style={{
      color: "white",
      marginLeft: 8,
      marginRight: 16,
      opacity: pressed ? 0.5 : 1,
     }}
    />
   )}
  </Pressable>
 )
}