import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Input } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Login() {
    return (
        <SafeAreaView>
            <StatusBar />
            <View>
                <Text>Usuário</Text>
                <Input placeholder="BASIC INPUT" />
            </View>
            <View>
                <Text>Senha</Text>
                <Input placeholder="BASIC INPUT" secureTextEntry={true} />
            </View>
        </SafeAreaView>
    );
}
