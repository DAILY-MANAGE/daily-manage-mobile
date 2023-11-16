import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheet, ListItem } from "@rneui/themed";

export default function EquipesLayout() {
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  const options = [
    {
      title: "Perfil",      
      onPress: () => (setIsVisible(!isVisible), router.replace("perfil")),
    },
    { title: "Ajuda" },
    {
      title: "Sair",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => (setIsVisible(!isVisible), router.replace("(auth)")),
    },
  ];

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerStyle: { backgroundColor: "#1C1C1C" },
            headerTitle: "Equipes",
            headerTitleStyle: {
              fontWeight: "500",
              color: "white"
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
                          color: "white",
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
              </>
            ),
          }}
        />
      </Stack>
      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={
          () => setIsVisible(!isVisible)
        }>
        {options.map((a, index) => (
          <ListItem
            key={index}
            containerStyle={a.containerStyle}
            onPress={a.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={a.titleStyle}>{a.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
}
