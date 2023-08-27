import {
    ListItem,
    SearchBar,
    SpeedDial,
    Button
} from '@rneui/themed';

import React, { useState } from 'react';

export default function Home() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = React.useState(false);

    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <>
            <SearchBar
                ref={search => this.search = search}
                style={{ padding: 8 }}
                placeholder="Pesquisar formulários..."
                onChangeText={updateSearch}
                value={search}
                lightTheme={true}
                inputStyle={{ backgroundColor: 'white' }}
                inputContainerStyle={{ backgroundColor: 'white' }}
                containerStyle={{ backgroundColor: '#f1f1f1', borderRadius: 8 }}
            />
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
                            color: "white"
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
                        icon={{ name: "delete-outline", color: "white" }}
                        onPress={action}
                    />
                )}
                bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "bold" }}>TURBO / GERADOR</ListItem.Title>
                    <ListItem.Subtitle style={{ color: "#ccc" }}>Ultima modificação: 27/08/2023 00:00</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem.Swipeable>
            <SpeedDial
                color='black'
                isOpen={open}
                icon={{ name: 'edit', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}

            >
                <SpeedDial.Action
                    color='cyan'
                    icon={{ name: 'add', color: '#fff' }}
                    title="Novo"
                    onPress={() => console.log('criar formulario')}
                />
                <SpeedDial.Action
                    color='red'
                    icon={{ name: 'delete', color: '#fff' }}
                    title="Excluir"
                    onPress={() => console.log('deletar formulário')}
                />
            </SpeedDial>
        </>
    );
}