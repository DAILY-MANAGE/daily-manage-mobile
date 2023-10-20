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
        backgroundColor: "#f1f1f1",
        borderRadius: 8
    },
    inputContainerStyle: {
        backgroundColor: "white",
    }
});