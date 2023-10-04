import React, { useState } from "react";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";

interface InputProps {
  placeholder?: string;
  textContentType: any;
 }

export default function InputComponent({
  placeholder = "Usuário",
  textContentType = {"username" : "password"}
}: InputProps) {
  const [user, setUser] = useState("");
  return (
    <>
      <Input
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        textContentType={textContentType}
        allowFontScaling={true}
        clearTextOnFocus={true}
        style={styles.inputStyle}
        autoCorrect={false}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.containerStyle}
        value={user}
        onChangeText={setUser}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    top: 12,
    fontSize: 20,
    paddingLeft: 8,
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
});
