import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import Logo from "../components/Logo";
import InputComponent from "./components/Input";
import ButtonComponent from "./components/Button";

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = () => {
    router.replace("(tabs)");
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.logoForm}>
          <Logo style={styles.logo}/>
          <View style={styles.formContainer}>
            <View style={styles.text}>
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                Bem-vindo de volta!
              </Text>
              <Text style={{ fontSize: 16 }}>Entre na sua conta</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputs}>
                <InputComponent
                  placeholder='Usuário'
                  label='Usuário'
                  value={usuario}
                  setValue={setUsuario}
                  textContentType='username'
                />
                <InputComponent
                  placeholder='Usuário'
                  label='Senha'
                  value={senha}
                  setValue={setSenha}
                  textContentType='password'
                />
              </View>
              <View style={styles.sumbites}>
                <ButtonComponent
                  onPress={handleSubmit}
                  title='Continuar'
                />
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
    height: "auto"
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
  },
  input: {
    gap: 10,
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
