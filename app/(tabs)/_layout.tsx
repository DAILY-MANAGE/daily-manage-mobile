import { Tabs, Link } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Pressable } from "react-native";

import TabBarIcon from "../components/TabBarIcon";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShadowVisible: true }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "DAILY MANAGE",
                    tabBarLabel: "Formulários",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                    tabBarLabelStyle: { fontWeight: "500" },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "gray",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="list" color={color} />
                    ),
                    headerRight: () => (
                        <Link href="/notifications" asChild>
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
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerTitle: "PERFIL",
                    tabBarIconStyle: { color: "gray" },
                    tabBarLabelStyle: { fontWeight: "500" },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "gray",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="user" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
