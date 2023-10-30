import { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  ToastAndroid
} from "react-native";
import { useRouter } from "expo-router";
import { CheckBox } from "@rneui/themed";
import { ENDPOINT, REGISTRO } from "../../utils/endpoints";
import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";

import axios from "axios";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const router = useRouter();

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  const toggleEye = () => {
    setIsEyeOpen(!isEyeOpen);
  };

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`${ENDPOINT}${REGISTRO}`, {
        usuario: user,
        senha: password,
        nome: name,
        email: mail,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        console.log(`${JSON.stringify(response.data)}`);
        setIsLoading(false);
        ToastAndroid.show(`Usuário ${user} criado com sucesso!`, ToastAndroid.SHORT);
        router.push("(auth)");
      } else {
        throw new Error(
          `${JSON.stringify(response.data)}`
        );
      }
    } catch (error) {
      ToastAndroid.show(`Erro ao entrar.`, ToastAndroid.SHORT);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputs}>
          <InputComponent
            label="Nome:"
            placeholder="Digite o nome completo"
            textContentType="name"
            value={name}
            setValue={setName}
            autoComplete="name"
          />
          <InputComponent
            label="Usuário:"
            placeholder="Digite o nome de usuário"
            textContentType="username"
            value={user}
            setValue={setUser}
            autoComplete="username"
          />
          <InputComponent
            label="E-mail:"
            placeholder="Exemplo: user@gmail.com"
            textContentType="emailAddress"
            value={mail}
            setValue={setMail}
            autoComplete="email"
          />
          <InputComponent
            label="Senha:"
            placeholder="Digite a senha"
            textContentType="password"
            value={password}
            setValue={setPassword}
            autoComplete="password"
            secureTextEntry={true}
          />
          <InputComponent
            label="Confirmar Senha:"
            placeholder="Repita a senha"
            textContentType="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            autoComplete="password"
            secureTextEntry={true}
          />
          <CheckBox
            containerStyle={styles.checkboxContainerStyle}
            checked={checked}
            onPress={toggleCheckbox}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="black"
            title="Li e aceito os Termos de Uso"
            textStyle={styles.checkboxTextStyle}
          />
        </View>
      <Pressable style={styles.button}>
        <ButtonComponent onPress={handleRegister} title="Salvar" />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    paddingBottom: 16,
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "space-between",
  },
  inputs: {
    gap: 16,
    paddingTop: 8,
    height: "auto",
    flexDirection: "column",
    width: "100%",
  },
  checkboxContainerStyle: {
    margin: 0,
    padding: 0,
    backgroundColor: "#FAFAFA",
  },
  checkboxTextStyle: {
    fontWeight: "600",
    color: "black"
  },
  button: {
    width: "100%",
    bottom: 0,
  },
});
