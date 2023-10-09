import { Button } from "@rneui/base";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface ButtonProps {
  onPress: string | any;
  title: string;
  color: string;
  buttonStyle: string | { borderWidth: number };
  type: "solid" | "outline";
  radius: "md" | "sm" | "lg";
  size: "md" | "sm" | "lg";
}

ButtonComponent.defaultProps = {
  radius: "md",
  size: "lg",
  color: "black",
  type: "solid",
};

const buttonStyleConverter = (
  buttonStyle: string | { borderWidth: number }
): StyleProp<ViewStyle> => {
  if (typeof buttonStyle === "string") {
    return { borderWidth: parseInt(buttonStyle, 10)};
  } else {
    return { borderWidth: buttonStyle.borderWidth };
  }
};

export default function ButtonComponent({
  onPress,
  radius,
  size,
  title,
  color,
  type,
  buttonStyle,
}: ButtonProps) {
  const buttonStyleProp = buttonStyleConverter(buttonStyle);
  return (
    <Button
      onPressIn={onPress}
      radius={radius}
      color={color}
      size={size}
      title={title}
      type={type}
      buttonStyle={buttonStyleProp}
    />
  );
}

const styles = StyleSheet.create({
  solid: {
    borderWidth: 0,
  },
  outline: {
    borderWidth: 1,
    borderColor: "black",
  },
});
