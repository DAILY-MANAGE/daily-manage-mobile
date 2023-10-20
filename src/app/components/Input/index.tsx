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
  label?: string
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
  label
}: CustomInputProps) {
  return (
    <View style={styles.input}>
      <View style={styles.labelView}>
        <Text style={styles.label}>{label}</Text>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    top: 12,
    fontSize: 16,
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
  input: {
    gap: 10,
  },
  labelView: {
    flexDirection: "row",
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "900",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
