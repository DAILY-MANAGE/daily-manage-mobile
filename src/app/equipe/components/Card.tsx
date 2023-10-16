import { Card } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

interface CardProps {
 content?: any,
 title: string,
}

export default function CardComponent({ content, title }: CardProps) {
  return (
    <Card containerStyle={styles.containerStyle}>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Card.Divider />
      <View style={styles.content}>
        <Text>{content}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
 containerStyle: {
  margin: 0, 
  width: "100%",
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
 content: {

 }
});
