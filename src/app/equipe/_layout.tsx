import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheet, ListItem } from "@rneui/themed";

export default function EquipeLayout() {
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  const options = [
    { title: "Perfil" },
    { title: "Ajuda" },
    {
      title: "Sair",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => (setIsVisible(false), router.replace("(auth)")),
    },
  ];

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerBackButtonMenuEnabled: false,
            headerTitle: "Equipes",
            headerTitleStyle: {
              fontWeight: "900",
            },
            headerRight: () => (
              <>
                <Link href="notificacoes" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="bell"
                        size={20}
                        style={{
                          marginRight: 15,
                          opacity: pressed ? 0.5 : 1,
                        }}
                      />
                    )}
                  </Pressable>
                </Link>
                <Pressable onPress={() => setIsVisible(!isVisible)}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="cog"
                      size={24}
                      style={{
                        marginRight: 15,
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>
              </>
            ),
          }}
        />
      </Stack>
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {options.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
}
