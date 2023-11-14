import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { StyleSheet } from "react-native";

interface SearchProps {
    value: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
  }

export default function CustomSearchBar({ value, onChangeText }: SearchProps) {
    return (
        <SearchBar
            placeholder="Pesquisar equipe..."
            value={value}
            onChangeText={onChangeText}
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
        backgroundColor: "#FAFAFA",
    },
    containerStyle: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
    },
    inputContainerStyle: {
        backgroundColor: "#FAFAFA",
        borderRadius: 64,
        borderWidth: 1,
        shadowOpacity: 0,
        elevation: 0,
    },
    leftIcon: {
        paddingLeft:8,
    }
}); 