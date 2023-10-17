import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import InputComponent from "./components/Input";
import { useState } from "react";
import ButtonComponent from "../components/Button";
import { useRouter } from "expo-router";
import Logo from "../components/Logo";
import { CheckBox } from "@rneui/themed";
import { baseURL } from "../../utils/baseURL";
import useAxios from "../../utils/useAxios";

export interface DadosRegistro {
  nome: string;
  email: string;
  usuario: string;
  senha: string;
  confirmarSenha?: string;
}

const axiosInstance = useAxios();

export default function Register() {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`${baseURL}/auth/register`, {
        usuario: user,
        senha: password,
        nome: name,  
        email: mail, 
      });
      console.log(response)
      if (response.status === 201) {
        console.log(`Registro realizado: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        router.push("(auth)");
      } else {
        throw new Error(
          `Erro ao registrar-se: ${JSON.stringify(response.data)}`
        );
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container__logo}>
        <View style={styles.logo__container}>
          <Logo style={styles.logo} />
          <Text style={styles.logo__title}>Cadastre-se</Text>
        </View>
        <View style={styles.inputs}>
          <InputComponent
            label='Nome Completo'
            placeholder='Nome Completo'
            textContentType='name'
            value={name}
            setValue={setName}
          />
          <InputComponent
            label='Usuário'
            placeholder='Usuário'
            textContentType='username'
            value={user}
            setValue={setUser}
          />
          <InputComponent
            label='E-mail'
            placeholder='E-mail'
            textContentType='emailAddress'
            value={mail}
            setValue={setMail}
          />
          <InputComponent
            label='Senha'
            placeholder='Senha'
            textContentType='password'
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <InputComponent
            label='Confirmar Senha'
            placeholder='Confirmar Senha'
            textContentType='password'
            value={confirmPassword}
            setValue={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>
      </View>
      <CheckBox
        containerStyle={styles.containerStyle}
        checked={checked}
        onPress={toggleCheckbox}
        iconType='material-community'
        checkedIcon='checkbox-marked'
        uncheckedIcon='checkbox-blank-outline'
        checkedColor='black'
        title='Li e aceito os Termos de Uso'
        textStyle={{ fontWeight: "normal" }}
      />
      <Pressable style={styles.button}>
        <ButtonComponent onPress={handleRegister} title='Salvar' />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    margin: 0,
    padding: 0,
  },
  logo__title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo__container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
  },
  container__logo: {
    width: "100%",
    height: "auto",
    gap: 16,
  },
  button: {
    width: "100%",
    bottom: 0,
  },
  container: {
    backgroundColor: "#FAFAFA",
    paddingBottom: 16,
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "space-between",
  },
  input: {
    gap: 10,
  },
  labelView: {
    flexDirection: "row",
    gap: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
  },
  inputs: {
    gap: 16,
    height: "auto",
    flexDirection: "column",
    width: "100%",
  },
});
