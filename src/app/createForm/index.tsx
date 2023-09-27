import { Input } from "@rneui/base";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CreateForm() {
  const[formName, setFormName] = useState("");

  return (
    <View style={s.container}>
      <Text style={s.title}>Criação de formulário</Text>
      <View style={s.inputs}>
        <View style={s.input}>
          <Input
            placeholder="Nome do formulário"
            allowFontScaling={true}
            autoCapitalize="none"
            style={s.customInput}
            inputContainerStyle={s.inputContainerStyle}
            containerStyle={s.containerStyle}
            value={formName}
            onChangeText={setFormName}
          />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  label: {
    fontSize: 16,
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
  logo: {
    width: 104,
    height: 104,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 32,
    gap: 16,
    paddingTop: 64,
    flexDirection: "column",
  },
  inputs: {
    gap: 16,
    height: "auto",
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
    height: 24,
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
