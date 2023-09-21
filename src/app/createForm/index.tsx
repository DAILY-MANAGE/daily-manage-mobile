import { Input } from "@rneui/base";
import { View, Text, StyleSheet } from "react-native";

export default function CreateForm() {
  return (
    <View>
      <Text>Dados iniciais</Text>
      <View>
        <View style={s.input}>
          <View style={s.labelView}>
            <Text style={s.label}>Senha</Text>
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
            value={"password"}
            onChangeText={() => {}}
          />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
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
    logo: {
      width: 104,
      height: 104,
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
  
