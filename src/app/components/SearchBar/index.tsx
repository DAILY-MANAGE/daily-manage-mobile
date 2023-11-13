import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { StyleSheet } from "react-native";

export default function CustomSearchBar() {
    const [search, setSearch] = useState("");

    const updateSearch = (search: any) => {
        setSearch(search);
    };

    return (
        <SearchBar
            ref={(search: any) => (this.search = search)}
            placeholder="Pesquisar equipe..."
            onChangeText={updateSearch}
            value={search}
            lightTheme={true}
            style={styles.searchBar}
            inputStyle={styles.inputStyle}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            leftIconContainerStyle={styles.leftIcon}
        />
    );
}

const styles = StyleSheet.create({
    searchBar: {
        padding: 8,        
    },
    inputStyle: {
        backgroundColor: "white",
    },
    containerStyle: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
    },
    inputContainerStyle: {
        backgroundColor: "white",
        borderRadius: 64,
        borderWidth: 1,
        shadowOpacity: 0,
        elevation: 0,
        
    },
    leftIcon: {
        paddingLeft:8,
    }
});