import React, { useState } from "react";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface InputProps {
  placeholder?: string;
  textContentType?: any;
  value: string;
  setValue: string | any;
  secureTextEntry?: boolean;
  editable?: boolean;
  autoComplete: any;
  rightIcon?: any;
}

export default function InputField({
  placeholder = "Placeholder",
  textContentType,
  value,
  setValue,
  secureTextEntry,
  editable,
  autoComplete,
  rightIcon
}: InputProps) {
  return (
    <Input
      placeholder={placeholder}
      textContentType={textContentType}
      style={styles.inputStyle}
      inputContainerStyle={styles.inputContainerStyle}
      containerStyle={styles.containerStyle}
      value={value}
      onChangeText={setValue}
      secureTextEntry={secureTextEntry}
      editable={editable}
      autoComplete={autoComplete}
      rightIcon={rightIcon}
    />
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
