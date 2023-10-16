import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import Logo from "../components/Logo";
import InputComponent from "./components/Input";
import ButtonComponent from "../components/Button";
import axios from "axios";
import { CheckBox } from "@rneui/themed";
import { baseURL } from "../../utils/baseURL";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

interface DadosLogin {
  usuario: string;
  senha: string;
  lembrarSenha?: boolean;
}

export default function Login({
  usuario = "",
  senha = "",
  lembrarSenha,
}: DadosLogin) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] =
    useState<React.SetStateAction<boolean>>(false);
  const [checked, setChecked] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`${URL}/auth/login`, {
        user: usuario,
        password: senha,
        rememberPassword: lembrarSenha,
      });
      if (response.status === 201) {
        console.log(`Login realizado: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        router.push("equipe");
      } else {
        throw new Error(`Erro ao logar-se: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      alert("Ocorreu um erro inesperado!");
      setIsLoading(false);
    }
  };

  const toggleCheckbox = () => {
    setChecked(!checked);
    setRememberPassword(checked);
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.logoForm}>
          <Logo style={styles.logo} />
          <View style={styles.formContainer}>
            <View style={styles.text}>
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                Bem-vindo ao Daily Manage!
              </Text>
              <Text style={{ fontSize: 16 }}>Entre na sua conta</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputs}>
                <InputComponent
                  placeholder='Digite seu nome de usuário'
                  label='Usuário'
                  value={user}
                  setValue={setUser}
                  textContentType='username'
                />
                <InputComponent
                  placeholder='Digite sua senha'
                  label='Senha'
                  value={password}
                  setValue={setPassword}
                  textContentType='password'
                />
                <CheckBox
                  containerStyle={{ backgroundColor: "white", padding: 0 }}
                  checked={checked}
                  onPress={toggleCheckbox}
                  iconType='material-community'
                  checkedIcon='checkbox-marked'
                  uncheckedIcon='checkbox-blank-outline'
                  checkedColor='black'
                  title='Lembrar senha'
                  textStyle={{ fontWeight: "normal" }}
                />
              </View>
              <View style={styles.sumbites}>
                <ButtonComponent onPress={handleLogin} title='Continuar' />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Pressable style={styles.registerButton}>
            <ButtonComponent
              onPress={() => router.push("/register")}
              title='Cadastrar-se'
              type='outline'
              titleStyle={{ color: "black" }}
              buttonStyle={{
                borderColor: "black",
                borderWidth: 1,
              }}
            />
          </Pressable>
          <Text style={{ color: "#ccc", fontSize: 16 }}>Lutherik</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputs: {
    gap: 16,
    height: "auto",
    paddingVertical: 16,
    flexDirection: "column",
    width: "100%",
  },
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
  logoForm: {
    gap: 32,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
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
  },
  registerButton: {
    width: "100%",
    height: "auto",
  },
  form: {
    width: "100%",
    flexDirection: "column",
    height: "auto",
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
  input: {
    gap: 10,
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
