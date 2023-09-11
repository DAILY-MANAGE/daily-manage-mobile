import React from "react";

import { ListItem, Input, CheckBox } from "@rneui/themed";

import { View } from "react-native";

export default function Form() {
    const [selectedIndex, setIndex] = React.useState(0);

    return (
        <>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>Há vazamento na turbina?</ListItem.Title>
                    <Input
                        rightIcon={{ type: "font-awesome", name: "close" }}
                        placeholder="ex: s / sim"
                        onChangeText={(value) => this.value}
                    />
                </ListItem.Content>
            </ListItem>

            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>Há vazamento na turbina?</ListItem.Title>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 70,
                        }}
                    >
                        <CheckBox
                            checked={selectedIndex === 0}
                            onPress={() => setIndex(0)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            title="Sim"
                        />
                        <CheckBox
                            checked={selectedIndex === 1}
                            onPress={() => setIndex(1)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            title="Não"
                        />
                    </View>
                </ListItem.Content>
            </ListItem>
        </>
    );
}
