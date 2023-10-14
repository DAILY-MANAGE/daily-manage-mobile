import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CriarEquipeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerLeft: () => (
           <Link href='equipes' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='arrow-left'
                    size={20}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitle: "Equipes",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Link href='/notifications' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='bell'
                    size={20}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
