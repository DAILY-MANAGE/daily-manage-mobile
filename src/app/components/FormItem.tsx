import { Button, ListItem } from "@rneui/base";
import { FormData } from "../interfaces/FormData";

export default function FormItem(props: FormData) {
  return (
    <ListItem.Swipeable
      leftWidth={80}
      rightWidth={90}
      leftContent={(action) => (
        <Button
          containerStyle={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "orange",
          }}
          type="clear"
          icon={{
            name: "archive-outline",
            type: "material-community",
            color: "white",
          }}
          onPress={action}
        />
      )}
      rightContent={(action) => (
        <Button
          containerStyle={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "red",
          }}
          type="clear"
          icon={{
            name: "delete-outline",
            color: "white",
          }}
          onPress={action}
        />
      )}
      bottomDivider
    >
      <ListItem.Content>
        <ListItem.Title
          style={{
            fontWeight: "bold",
          }}
        >
          {props.nome}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{
            color: "#ccc",
          }}
        >
          {props.dataCriacao}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}
