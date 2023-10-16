import { Card } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

interface CardProps {
 content?: any,
 title: string,
}

export default function CardComponent({ title }: CardProps) {
  return (
    <Card containerStyle={styles.containerStyle}>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Card.Divider />
    </Card>
  );
}

const styles = StyleSheet.create({
 containerStyle: {
  flex: 1,
  margin: 0, 
  width: "100%",
  height: "auto",
  borderRadius: 8,
  borderColor: "black",
  borderWidth: 1.5,
  backgroundColor: "#FAFAFA"  
 },
 title: {
  alignSelf: "flex-start",
  fontSize: 20,
  color: "black"
 },
});
