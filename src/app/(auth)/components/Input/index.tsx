import { StyleSheet, View, Text } from "react-native";
import InputField from "./field";
interface InputProps {
  placeholder?: string;
  textContentType?: any;
  value: string;
  setValue: string | any;
  label?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
}

export default function InputComponent({
  placeholder = "Placeholder",
  textContentType,
  value,
  setValue,
  label,
  secureTextEntry,
  editable,
}: InputProps) {
  return (
    <View style={styles.input}>
      {/* <View style={styles.labelView}>
        <Text style={styles.label}>{label}</Text>
      </View> */}
      <InputField
        placeholder={placeholder}
        textContentType={textContentType}
        value={value}
        setValue={setValue}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  error: {
    color: "red",
    fontSize: 16,
  },
});
