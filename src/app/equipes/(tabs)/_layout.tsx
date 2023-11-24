import { Tabs } from "expo-router"
import React from "react"
import { StyleSheet } from "react-native"
import TabBarIcon from "../../equipe/(components)/TabBarIcon"
import HeaderRightIcons from "../../components/HeaderRight"
import BackButton from "../../components/BackButton"

export default function EquipesLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Equipes criadas",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          headerRight: () => (<HeaderRightIcons />),
        }}
      />
      <Tabs.Screen
        name="member"
        options={{
          headerTitle: "Equipes membro",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user-plus" color={color} />,
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