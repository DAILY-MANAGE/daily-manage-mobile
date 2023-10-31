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
import ButtonComponent from "../components/Button";
import axios from "axios";
import CustomInput from "../components/Input";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const validateFields = () => {
    const errors = {name, user, mail, password, confirmPassword};
  
    if (!name) {
      errors.name = "O campo nome é obrigatório.";
    } else {
      errors.name = ""
    }
  
    if (!user) {
      errors.user = "O campo usuário é obrigatório.";
    } else if (user.length < 5) {
      errors.user = "O campo usuário deve ter mais que 5 caracteres.";
    } else {
      errors.user = ""
    }
  
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!mail) {
      errors.mail = "O campo e-mail é obrigatório."
    } else if (!regex.test(mail)) {
      errors.mail = "E-mail inválido";
    } else {
      errors.mail = ""
    }
  
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!password) {
      errors.password = "A senha é obrigatória."
    } else if (!regexPassword.test(password)) {
      errors.password = "A senha precisa ter uma letra maiúscula, uma minúscula, um número e um símbolo, e no mínimo 8 caracteres";
    } else {
      errors.password = ""
    }
  
    if (!confirmPassword) {
      errors.confirmPassword = "É necessário confirmar a senha."
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "As senhas precisam ser iguais";
    } else {
      errors.confirmPassword = ""
    }
  
    return errors;
  };

  const errors = validateFields();

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
      switch (response.status) {
        case 201:
          setIsLoading(false);
          ToastAndroid.show(`Usuário ${user} criado com sucesso!`, ToastAndroid.SHORT);
          router.push("(auth)");
          break;
        case 409:
          ToastAndroid.show(`O usuário ${user} já existe`, ToastAndroid.SHORT)
          break
        default:
          throw new Error(`${JSON.stringify(response.data)}`);
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
        <CustomInput
          errorMessage={errors.name}
          label="Nome:"
          placeholder="Digite o nome completo"
          textContentType="name"
          value={name}
          setValue={setName}
          autoComplete="name"
        />
        <CustomInput
          errorMessage={errors.user}
          label="Usuário:"
          placeholder="Digite o nome de usuário"
          textContentType="username"
          value={user}
          setValue={setUser}
          autoComplete="username"
        />
        <CustomInput
          errorMessage={errors.mail}
          label="E-mail:"
          placeholder="Exemplo: user@gmail.com"
          textContentType="emailAddress"
          value={mail}
          setValue={setMail}
          autoComplete="email"
        />
        <CustomInput
          errorMessage={errors.password}
          label="Senha:"
          placeholder="Digite a senha"
          textContentType="password"
          value={password}
          setValue={setPassword}
          autoComplete="password"
          secureTextEntry={true}
        />
        <CustomInput
          errorMessage={errors.confirmPassword}
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
