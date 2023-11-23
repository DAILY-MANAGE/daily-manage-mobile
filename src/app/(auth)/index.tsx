import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, ToastAndroid } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { setToken } from "../../hooks/token";
import { BASEURL, LOGIN } from "../../utils/endpoints";
import ButtonComponent from "../components/Button";
import Logo from "../components/Logo";
import CustomInput from "../components/Input";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { axiosInstance } from "../../utils/useAxios";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true)

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

  const toggleSecurePassword = () => {
    setSecurePassword(!securePassword);
  };

  const i = axiosInstance

  const login = async () => {

    setIsLoading(true);

    try {
      const res = await i.post(
        `${BASEURL}${LOGIN}`,
        {
          usuario: user,
          senha: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (res.status === 200) {
        console.log(`${JSON.stringify(res.data)}`);
        setToken(res.data.token);
        setIsLoading(false);
        router.replace("equipes");

      } else {
        throw new Error(`${JSON.stringify(res.data)}`);
      }

    } catch (err) {
      console.log(err);

      if (err.response && err.response.status === 403) {
        ToastAndroid.showWithGravity(
          "Usuário ou senha incorretos...",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );

        setPassword("");
      } else {
        ToastAndroid.showWithGravity(
          "Erro ao fazer login. Tente novamente mais tarde.",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }

      setIsLoading(false);
    }
  };

  function Eye({ onPress }) {
    return (
      <Pressable onPress={onPress}>
        {!securePassword ? <FontAwesome size={20} name="eye" /> : <FontAwesome size={20} name="eye-slash" color="#acacac" />}
      </Pressable>
    );
  }

  return (
    <View>
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
                  errorMessage={''}
                  placeholder="Digite o nome de usuário"
                  label="Usuário:"
                  value={user}
                  setValue={setUser}
                  textContentType="username"
                  autoComplete="username"
                />
                <CustomInput
                  errorMessage={''}
                  placeholder="Digite a senha"
                  label="Senha:"
                  value={password}
                  setValue={setPassword}
                  textContentType="password"
                  autoComplete="password"
                  secureTextEntry={securePassword}
                  rightIcon={<Eye onPress={toggleSecurePassword} />}
                  rightIconStyle={styles.rightIconContainerStyle}
                />
              </View>
              <View style={styles.sumbite}>
                {isLoading ? (
                  <ButtonComponent title="Continuar" loading={true} />
                ) : (
                  <ButtonComponent title="Continuar" onPress={login} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  rightIconContainerStyle: {
    height: 32,
    width: "auto",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "column"
  },
  customInput: {
    marginBottom: 12,
    gap: 10
  },
  eyeIcon: {
    height: "auto",
    width: "auto",
    alignSelf: "flex-end",
    flexDirection: "column",
  },
  eyeContainer: {
    height: "100%",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
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
