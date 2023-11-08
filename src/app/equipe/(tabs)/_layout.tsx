import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Link, Tabs, useRouter } from "expo-router";
import { BottomSheet, ListItem } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TabBarIcon from "../(components)/TabBarIcon";

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
            headerTitle: `Equipe`,
            headerTitleStyle: styles.headerTitleStyle,
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerLeft: () => (
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
              </View>
            ),
            tabBarLabel: "Formulários",
            tabBarLabelStyle: styles.tabBarLabelStyle,
          }}
        />
        <Tabs.Screen
          name="usuarios"
          options={{
            headerTitle: "Usuários",
            headerTitleStyle: styles.headerTitleStyle,
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
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
              <View style={styles.headerIconsStyle}>
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
              </View>
            ),
            tabBarLabel: "Usuários",
            tabBarLabelStyle: styles.tabBarLabelStyle,
          }}
        />
        <Tabs.Screen
          name="configuracoes"
          options={{
            headerTitle: "Configurações",
            headerTitleStyle: styles.headerTitleStyle,
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
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
              <View style={styles.headerIconsStyle}>
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
              </View>
            ),
            tabBarLabel: "Equipe",
            tabBarLabelStyle: styles.tabBarLabelStyle,
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
    fontWeight: "900",
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
    color: "black",
    paddingBottom: 4,
  },
});
