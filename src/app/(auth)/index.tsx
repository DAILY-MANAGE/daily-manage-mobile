import React, { useState } from "react";
import axios from "axios";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { CheckBox } from "@rneui/themed";
import { setToken } from "../../hooks/token";
import { ENDPOINT, LOGIN } from "../../utils/endpoints";
import ButtonComponent from "../components/Button";
import InputComponent from "../components/Input";
import Logo from "../components/Logo";
import CustomInput from "../components/Input";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [rememberPassword, setRememberPassword] =
    useState<React.SetStateAction<boolean>>(false);

  const validateFields = () => {
    const errors = { user, password };

    if (!user) {
      errors.user = "O campo usuário é obrigatório.";
    } else {
      errors.user = "";
    }

    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!password) {
      errors.password = "A senha é obrigatória.";
    } else {
      errors.password = "";
    }

    return errors;
  };

  const errors = validateFields();
  const router = useRouter();

  const toggleCheckbox = () => {
    setChecked(!checked);
    setRememberPassword(checked);
  };

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT}${LOGIN}`,
        {
          usuario: user,
          senha: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(`${JSON.stringify(response.data)}`);
        setToken(response.data.token);
        setIsLoading(false);
        router.replace("equipes");
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.container__logo}>
          <Logo style={styles.logo} />
          <View style={styles.container__form}>
            <View style={styles.header}>
              <Text style={styles.title}>Bem-vindo ao Daily Manage!</Text>
              <Text style={styles.subtitle}>Entre na sua conta</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputs}>
                <CustomInput
                  errorMessage={errors.user}
                  placeholder="Digite seu nome de usuário"
                  label="Usuário:"
                  value={user}
                  setValue={setUser}
                  textContentType="username"
                  autoComplete="username"
                />
                <CustomInput
                  errorMessage={errors.password}
                  placeholder="Digite sua senha"
                  label="Senha:"
                  value={password}
                  setValue={setPassword}
                  textContentType="password"
                  autoComplete="password"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.sumbite}>
                {isLoading ? (
                  <ButtonComponent title="Continuar" loading={true} />
                ) : (
                  <ButtonComponent title="Continuar" onPress={handleLogin} />
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Pressable style={styles.button_register}>
            <ButtonComponent
              title="Cadastrar-se"
              type="outline"
              onPress={() => router.push("/cadastro")}
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
            />
          </Pressable>
          <Text style={styles.lutherik}>Lutherik</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 32,
    paddingTop: 32,
    flexDirection: "column",
    backgroundColor: "white",
  },
  container__logo: {
    gap: 32,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  logo: {
    width: 104,
    height: 104,
  },
  container__form: {
    width: "100%",
  },
  header: {
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  subtitle: {
    color: "#585655",
  },
  form: {
    width: "100%",
    flexDirection: "column",
    height: "auto",
  },
  inputs: {
    gap: 16,
    height: "auto",
    paddingVertical: 16,
    flexDirection: "column",
    width: "100%",
  },
  checkboxContainerStyle: {
    backgroundColor: "white",
    padding: 0,
  },
  checkboxTextStyle: {
    fontWeight: "normal",
  },
  sumbite: {
    flexDirection: "column",
    gap: 16,
  },
  footer: {
    bottom: 0,
    gap: 8,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  button_register: {
    width: "100%",
    height: "auto",
  },
  buttonTitleStyle: {
    color: "black",
  },
  buttonStyle: {
    borderColor: "black",
    borderWidth: 1,
  },
  lutherik: {
    color: "#ccc",
    fontSize: 16,
  },
});
