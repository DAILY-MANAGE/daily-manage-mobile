import React, { useState } from "react"
import { Input } from "@rneui/themed"
import {
  StyleSheet,
  View,
  Text
} from "react-native"

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
  rightIconStyle?: any,
  shake?: () => {},
  renderError?: boolean,
  inputStyle?: any
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
  rightIconStyle,
  shake,
  renderError,
  inputStyle
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={style ? style : styles.input}>
      <View style={styles.labelView}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Input
        errorMessage={renderError ? errorMessage : ''}
        placeholder={placeholder}
        textContentType={textContentType}
        style={inputStyle ? inputStyle : styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={[
          styles.containerStyle,
          { borderColor: isFocused ? "black" : "#c5c5c5" },
        ]}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        editable={editable}
        autoComplete={autoComplete}
        rightIconContainerStyle={rightIconStyle}
        rightIcon={rightIcon}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        shake={shake}
        renderErrorMessage={renderError}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    top: 12,
    fontSize: 16,
    paddingLeft: 8,
    fontStyle: "italic",
    fontWeight: "400",
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    paddingBottom: 0,
  },
  containerStyle: {
    height: 64,
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
    fontSize: 16,
    fontWeight: "500",
    color: "#323232"
  },
  error: {
    color: "red",
    fontSize: 16,
  },
})
