import React, { useState } from "react"
import { SearchBar } from "@rneui/themed"
import { StyleSheet } from "react-native"
import { saveColor } from "../../../utils/constants"

interface SearchProps {
    value: string
    onChangeText: React.Dispatch<React.SetStateAction<string>>
    placeholder?: string
    showLoading?: boolean
}

export default function CustomSearchBar({ value, onChangeText, placeholder, showLoading }: SearchProps) {
    const [isFocused, setIsFocused] = useState(false)

    const onFocus = () => {
        setIsFocused(true)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    return (
        <SearchBar
            showLoading={showLoading}
            round={false}
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => onChangeText(text)}
            lightTheme={true}
            style={[
                styles.searchBar,
                isFocused && {
                    borderColor: "black",
                },
            ]}
            inputStyle={
                styles.inputStyle
               }
            containerStyle={
                styles.containerStyle
                }
            inputContainerStyle={[
                styles.inputContainerStyle,
                isFocused && {
                    borderColor: "black",
                },
            ]}
            leftIconContainerStyle={styles.leftIcon}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    )
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
    },
    inputContainerStyle: {
        backgroundColor: "#FAFAFA",
        borderRadius: 64,
        borderWidth: 1,
        shadowOpacity: 0,
        elevation: 0,
    },
    leftIcon: {
        paddingLeft: 8,
    }
}) 