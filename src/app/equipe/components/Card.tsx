import { Card } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";

interface CardProps {
 title: string,
}

export default function CardComponent({ title }: CardProps) {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
 containerStyle: {
  flex: 1,
  padding: 16,
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
  color: "black",
  fontWeight: "500"
 },
});
