import { Button } from "@rneui/base";

interface ButtonProps {
  onPress: string | any;
  title: string;
  color: string;
  type: "solid" | "outline";
  radius: "md" | "sm" | "lg";
  size: "md" | "sm" | "lg";
  buttonStyle: any;
  titleStyle: any;
}

ButtonComponent.defaultProps = {
  radius: "md",
  size: "lg",
  color: "black",
  type: "solid",
  titleStyle: "",
};

export default function ButtonComponent({
  onPress,
  radius,
  size,
  title,
  color,
  type,
  buttonStyle,
  titleStyle,
}: ButtonProps) {
  return (
    <Button
      onPressIn={onPress}
      radius={radius}
      color={color}
      size={size}
      title={title}
      type={type}
      buttonStyle={buttonStyle}
      titleStyle={titleStyle}
    />
  );
}
