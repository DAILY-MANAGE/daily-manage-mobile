import React from "react"
import { StyleSheet } from "react-native"
import { Tabs } from "expo-router"
import TabBarIcon from "../(components)/TabBarIcon"
import BackButton from "../../components/BackButton"
import HeaderRightIcons from "../../components/HeaderRight"

export default function EquipeLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="[id]"
        options={{
          headerTitle: `Formulários da equipe`,
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => (<BackButton />),
          headerRight: () => (<HeaderRightIcons />),
        }}
      />
      <Tabs.Screen
        name="usuarios"
        options={{
          headerTitle: "Membros",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (<TabBarIcon name="users" color={color} />),
          headerLeft: () => (<BackButton />),
          headerRight: () => (<HeaderRightIcons />),
        }}
      />
      <Tabs.Screen
        name="registros"
        options={{
          headerTitle: "Registros da equipe",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="inbox" color={color} />,
          headerLeft: () => (<BackButton />),
          headerRight: () => (<HeaderRightIcons />),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "500",
    color: "white",
  },
  headerStyle: {
    backgroundColor: "#1C1C1C"
  },
  tabBarStyle: {
    backgroundColor: "#1C1C1C"
  },
})
