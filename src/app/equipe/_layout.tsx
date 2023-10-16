import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EquipeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Equipe",
          headerTitleStyle: {
            fontWeight: "900",
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
