import { View, StyleSheet, Pressable, Text } from "react-native";
import InputComponent from "./components/Input";
import { useState } from "react";
import ButtonComponent from "./components/Button";
import { useRouter } from "expo-router";
import Logo from "../components/Logo";
import { CheckBox } from "@rneui/themed";

export default function Register() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    router.canGoBack();
  };

  const toggleCheckbox = () => setChecked(!checked);

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
            value={nome}
            setValue={setNome}
          />
          <InputComponent
            label='Usuário'
            placeholder='Usuário'
            textContentType='username'
            value={usuario}
            setValue={setUsuario}
          />
          <InputComponent
            label='E-mail'
            placeholder='E-mail'
            textContentType='emailAddress'
            value={email}
            setValue={setEmail}
          />
          <InputComponent
            label='Senha'
            placeholder='Senha'
            textContentType='password'
            value={senha}
            setValue={setSenha}
            secureTextEntry={true}
          />
          <InputComponent
            label='Confirmar Senha'
            placeholder='Confirmar Senha'
            textContentType='password'
            value={confirmarSenha}
            setValue={setConfirmarSenha}
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
        <ButtonComponent onPress={handleSubmit} title='Salvar' />
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
