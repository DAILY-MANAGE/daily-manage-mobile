import { Text } from "react-native";

import { ListItem, Icon } from "@rneui/themed";

export default function Notificacoes() {
    return (
        <>
            <ListItem>
                <Icon name="inbox" type="material-community" color="grey" />
                <ListItem.Content>
                    <ListItem.Title>Formulário Criado</ListItem.Title>
                </ListItem.Content>
                <Text>1d</Text>
            </ListItem>
        </>
    );
}
