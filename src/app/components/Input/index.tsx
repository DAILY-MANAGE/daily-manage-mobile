import React from "react";
import { Input } from "@rneui/themed";
import {
  StyleSheet,
  View,
  Text
} from "react-native";

interface CustomInputProps {
  placeholder?: string,
  textContentType?: any,
  value?: any,
  setValue?: any,
  secureTextEntry?: boolean,
  editable?: boolean,
  autoComplete?: any,
  rightIcon?: any,
  label?: string,
  errorMessage?: string,
  style?: any,
  rightIconStyle?: any
}

export default function CustomInput({
  placeholder,
  textContentType,
  value,
  setValue,
  secureTextEntry,
  editable,
  autoComplete,
  rightIcon,
  label,
  errorMessage,
  style,
  rightIconStyle
}: CustomInputProps) {
  return (
    <View style={style ? style : styles.input}>
      <View style={styles.labelView}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Input
        errorMessage={errorMessage}
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
        rightIconContainerStyle={rightIconStyle}
        rightIcon={rightIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    top: 12,
    fontSize: 16,
    paddingLeft: 8,
    fontStyle: "italic",
    fontWeight: "400"
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
    borderColor: "#c5c5c5",
    borderWidth: 1,
    shadowColor: "black",
    elevation: 2,
  },
  input: {
    gap: 10,
  },
  labelView: {
    flexDirection: "row",
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#323232"
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
