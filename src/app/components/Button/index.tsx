import { Button } from "@rneui/themed";

interface CustomButtonProps {
  size?: "md" | "sm" | "lg";
  type?: "solid" | "outline";
  title: string;
  color?: string;
  radius?: "md" | "sm" | "lg";
  onPress?: string | any;
  titleStyle?: any;
  buttonStyle?: any;
  icon?: any;
  loading?: boolean
}

CustomButton.defaultProps = {
  size: "lg",
  type: "solid",
  color: "black",
  radius: "md",
  titleStyle: "",
  buttonStyle: "",
  icon: undefined,
  loading: false
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
  icon,
  loading,
}: CustomButtonProps) {
  return (
    <Button
      loading={loading}
      icon={icon}
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
