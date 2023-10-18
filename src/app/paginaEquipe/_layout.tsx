import { Link, Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheet, ListItem } from "@rneui/themed";

export default function PaginaEquipeLayout() {
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
      <Tabs>
        <Tabs.Screen
          name="[id]"
          options={{
            headerTitle: "Equipe",
            headerTitleStyle: { fontWeight: "900" },
            headerLeft: () => (
              <>
                <Pressable onPress={() => router.back()}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="arrow-left"
                      size={20}
                      style={{
                        marginLeft: 16,
                        marginRight: 8,
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>
              </>
            ),
            headerRight: () => (
              <>
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
            tabBarIcon: () => {
              return <FontAwesome name="list" size={24} color={"black"} />;
            },
            tabBarLabel: "Formulários",
            tabBarLabelStyle: { color: "black", paddingBottom: 4 },
          }}
        />
        <Tabs.Screen
          name="usuarios"
          options={{
            headerTitle: "Usuários",
            headerTitleStyle: { fontWeight: "900" },
            headerLeft: () => (
              <>
                <Pressable onPress={() => router.back()}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="arrow-left"
                      size={20}
                      style={{
                        marginLeft: 16,
                        marginRight: 8,
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>
              </>
            ),
            headerRight: () => (
              <>
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
            tabBarIcon: () => {
              return <FontAwesome name="user" size={24} color={"black"} />;
            },
            tabBarLabel: "Usuários",
            tabBarLabelStyle: { color: "black", paddingBottom: 4 },
          }}
        />
        <Tabs.Screen
          name="configuracoes"
          options={{
            headerTitle: "Configurações",
            headerTitleStyle: { fontWeight: "900" },
            headerLeft: () => (
              <>
                <Pressable onPress={() => router.back()}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="arrow-left"
                      size={20}
                      style={{
                        marginLeft: 16,
                        marginRight: 8,
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>
              </>
            ),
            headerRight: () => (
              <>
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
            tabBarIcon: () => {
              return <FontAwesome name="group" size={24} color={"black"} />;
            },
            tabBarLabel: "Equipe",
            tabBarLabelStyle: { color: "black", paddingBottom: 4 },
          }}
        />
      </Tabs>
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
