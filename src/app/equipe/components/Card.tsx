import { Text } from "react-native";

interface CardComponentProps {
  nome: any;
}

export default function CardComponent({ nome }: CardComponentProps) {
  return (
    <Text>{nome}</Text>
  );
}