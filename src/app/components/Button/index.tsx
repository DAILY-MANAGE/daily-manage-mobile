import { Button } from "@rneui/base";

interface CustomButtonProps {
  size?: "md" | "sm" | "lg";
  type?: "solid" | "outline";
  title: string;
  color?: string;
  radius?: "md" | "sm" | "lg";
  onPress: string | any;
  titleStyle?: any;
  buttonStyle?: any;
}

CustomButton.defaultProps = {
  size: "lg",
  type: "solid",
  color: "black",
  radius: "md",
  titleStyle: "",
  buttonStyle: "",
};

export default function CustomButton({
  size,
  type,
  title,
  color,
  radius,
  onPress,
  titleStyle,
  buttonStyle,
}: CustomButtonProps) {
  return (
    <Button
      size={size}
      type={type}
      color={color}
      title={title}
      radius={radius}
      onPressIn={onPress}
      titleStyle={titleStyle}
      buttonStyle={buttonStyle}
    />
  );
}
