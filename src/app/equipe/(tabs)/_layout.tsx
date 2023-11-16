import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Link, Tabs, useRouter } from "expo-router";
import { BottomSheet, ListItem } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TabBarIcon from "../(components)/TabBarIcon";
import { color } from "@rneui/base";

export default function EquipeLayout() {
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
      onPress: () => (setIsVisible(false), router.replace("(auth)")),
    },
  ];

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="[id]"
          options={{
            headerStyle: { backgroundColor: "#1C1C1C" },
            headerTitle: `Equipe`,
            headerTitleStyle: styles.headerTitleStyle,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { backgroundColor: "#1C1C1C" },
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                {({ pressed }) => (
                  <FontAwesome
                    name="arrow-left"
                    size={20}
                    style={{
                      color: "white",
                      marginLeft: 16,
                      marginRight: 8,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  />
                )}
              </Pressable>
            ),
            headerRight: () => (
              <View style={styles.headerIconsStyle}>
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
                      name="cog"
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
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="usuarios"
          options={{
            headerStyle: { backgroundColor: "#1C1C1C" },
            headerTitle: "Usuários",
            headerTitleStyle: styles.headerTitleStyle,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { backgroundColor: "#1C1C1C" },
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="users" color={color} />
            ),
            headerLeft: () => (
              <>
                <Pressable onPress={() => router.back()}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="arrow-left"
                      size={20}
                      style={{
                        color: "white",
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
              <View style={styles.headerIconsStyle}>
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
                      name="cog"
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
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="configuracoes"
          options={{
            headerStyle: { backgroundColor: "#1C1C1C" },
            headerTitle: "Configurações",
            headerTitleStyle: styles.headerTitleStyle,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { backgroundColor: "#1C1C1C" },
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
            headerLeft: () => (
              <>
                <Pressable onPress={() => router.back()}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="arrow-left"
                      size={20}
                      style={{
                        color: "white",
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
              <View style={styles.headerIconsStyle}>
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
                      name="cog"
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
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
      <BottomSheet isVisible={isVisible}>
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

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "500",
    color: "white",
  },
  headerIconsStyle: {
    height: "auto",
    width: "auto",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarLabelStyle: {
    color: "white",
    paddingBottom: 4,
  },
});
