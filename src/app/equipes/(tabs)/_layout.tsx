import { Link, Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheet, ListItem } from "@rneui/themed";
import TabBarIcon from "../../equipe/(components)/TabBarIcon";

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
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: "Equipes Criadas",
            headerStyle: { backgroundColor: "#1C1C1C" },
            headerTitleStyle: styles.headerTitleStyle,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { backgroundColor: "#1C1C1C" },
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
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
          }}
        />

        <Tabs.Screen
          name="member"
          options={{
            headerTitle: "Equipes Membro",
            headerStyle: { backgroundColor: "#1C1C1C" },
            headerTitleStyle: styles.headerTitleStyle,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { backgroundColor: "#1C1C1C" },
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="user-plus" color={color} />,
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
          }}
        />
      </Tabs>
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