import { View, StyleSheet, Image, Pressable } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import Logo from "../components/Logo";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const validateFields = () => {
    const errors = [];

    if (user === "") {
      errors.push("*");
    }

    if (password === "") {
      errors.push("*");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  const handleSubmit = () => {
    const validate = validateFields();
    if (!validate.valid) {
      setErrors(validate.errors);
      return;
    }
    router.replace("(tabs)");
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={s.container}>
        <View style={s.logoForm}>
          <Logo />
          <View style={s.formContainer}>
            <View style={s.text}>
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                Bem-vindo de volta!
              </Text>
              <Text style={{ fontSize: 16 }}>Entre na sua conta</Text>
            </View>
            <View style={s.form}>
              <View style={s.inputs}>
                <View style={s.input}>
                  <View style={s.labelView}>
                    <Text style={s.label}>Usuário</Text>
                    {errors.length > 0 && user === "" && (
                      <Text style={s.error}>{errors[0]}</Text>
                    )}
                  </View>
                  <Input
                    placeholder={"Usuário"}
                    placeholderTextColor="#ccc"
                    textContentType="username"
                    allowFontScaling={true}
                    clearTextOnFocus={true}
                    autoCapitalize="none"
                    style={s.customInput}
                    autoCorrect={false}
                    inputContainerStyle={s.inputContainerStyle}
                    containerStyle={s.containerStyle}
                    value={user}
                    onChangeText={setUser}
                  />
                </View>
                <View style={s.input}>
                  <View style={s.labelView}>
                    <Text style={s.label}>Senha</Text>
                    {errors.length > 0 && password === "" && (
                      <Text style={s.error}>{errors[1]}</Text>
                    )}
                  </View>
                  <Input
                    placeholder="Senha"
                    placeholderTextColor="#ccc"
                    textContentType="password"
                    allowFontScaling={true}
                    clearTextOnFocus={true}
                    autoCapitalize="none"
                    style={s.customInput}
                    autoCorrect={false}
                    inputContainerStyle={s.inputContainerStyle}
                    containerStyle={s.containerStyle}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
              <View style={s.sumbites}>
                <Button
                  onPressIn={handleSubmit}
                  radius="md"
                  color="black"
                  size="lg"
                  title="Entrar"
                ></Button>
              </View>
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
            ></Button>
          </Pressable>
          <Text style={{ color: "#ccc", fontSize: 16 }}>Lutherik</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  logo: {
    width: 104,
    height: 104,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
  },
  labelView: {
    flexDirection: "row",
    gap: 8,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  logoForm: {
    gap: 32,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
  },
  sumbites: {
    flexDirection: "column",
    gap: 16,
  },
  footer: {
    bottom: 0,
    gap: 8,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 8,
  },
  register: {
    width: "100%",
    height: "auto",
  },
  form: {
    width: "100%",
    flexDirection: "column",
  },

  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 32,
    paddingTop: 64,
    flexDirection: "column",
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
  },
});
