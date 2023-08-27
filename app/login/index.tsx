import { Text } from "react-native";
import { Link } from "expo-router";

export default function Login() {
    return (
        <Link href="/home">
            <Text>Oi Login</Text>
        </Link>
    );
}