import { View, StyleSheet, Image, Platform, Pressable } from "react-native";
import { Button, Input } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text } from "@rneui/base";

export default function Login() {
    return (
        <SafeAreaView>
            <StatusBar />
            <View style={s.container}>
                <Image style={s.logo} source={require("../../assets/icon.png")} />
                <View style={s.formContainer}>
                    <View style={s.text}>
                        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                            Bem-vindo de volta!
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Entre na sua conta
                        </Text>
                    </View>
                    <View style={s.form}>
                        <View style={s.inputs}>
                            <View style={s.input}>
                                <Input
                                    placeholder="Usuário"
                                    placeholderTextColor="#ccc"
                                    textContentType="username"
                                    allowFontScaling={true}
                                    clearTextOnFocus={true}
                                    autoCapitalize='none'
                                    style={s.customInput}
                                    autoCorrect={false}
                                    inputContainerStyle={s.inputContainerStyle}
                                    containerStyle={s.containerStyle}
                                />
                            </View>
                            <View style={s.input}>
                                <Input
                                    placeholder="Senha"
                                    placeholderTextColor="#ccc"
                                    textContentType="password"
                                    allowFontScaling={true}
                                    clearTextOnFocus={true}
                                    autoCapitalize='none'
                                    style={s.customInput}
                                    autoCorrect={false}
                                    inputContainerStyle={s.inputContainerStyle}
                                    containerStyle={s.containerStyle}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
                        <View style={s.sumbites}>
                            <Pressable>
                                <Button
                                    radius="md"
                                    color="black"
                                    size="lg"
                                    title="Entrar"
                                >
                                </Button>
                            </Pressable>
                            <Pressable style={s.forgotPassword}>
                                <Text>Esqueceu a senha?</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={s.footer}>
                    <Pressable style={s.register}>
                        <Button
                            type="outline"
                            radius="md"
                            color="warn"
                            size="lg"
                            title="Registrar-se"
                            titleStyle={{ color: "black" }}
                            buttonStyle={{
                                borderColor: "black",
                                borderWidth: 1,
                            }}
                        >
                        </Button>
                    </Pressable>
                    <Text style={{ color: "#ccc", fontSize: 16 }}>Lutherik</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    formContainer: {
        width: "100%"
    },
    sumbites: {
        flexDirection: "column",
        gap: 16,
    },
    footer: {
        gap: 16,
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    register: {
        width: "100%"
    },
    form: {
        width: "100%",
        flexDirection: "column",
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
    },
    logo: {
        width: 104,
        height: 104,
    },
    container: {
        alignItems: "center",
        height: "100%",
        paddingHorizontal: 32,
        paddingVertical: 32,
        flexDirection: "column",
        rowGap: 120,
    },
    inputs: {
        gap: 16,
        height: "auto",
        paddingVertical: 16,
        flexDirection: "column",
        width: "100%",
    },
    customInput: {
        top: 12,
        fontSize: 20,
        paddingLeft: 8,
    },
    input: {
        gap: 10,
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
        paddingBottom: 0,
    },
    containerStyle: {
        backgroundColor: "white",
        borderRadius: 12,
        borderColor: "black",
        borderWidth: 1,
        shadowColor: "black",
        elevation: 2,
    },
    text: {
        justifyContent: "flex-start",
        width: "100%",
    },
    forgotPassword: {
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
    }
});
