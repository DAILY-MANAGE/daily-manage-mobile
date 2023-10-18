import { SearchBar } from "@rneui/themed";
import React from "react";
import { useState } from "react";

export default function CustomSearchBar() {
    const [search, setSearch] = useState("");

    const updateSearch = (search: any) => {
        setSearch(search);
    };

    return (
        <SearchBar
            ref={(search) => (this.search = search)}
            style={{
                padding: 8,
            }}
            placeholder="Pesquisar formulários..."
            onChangeText={updateSearch}
            value={search}
            lightTheme={true}
            inputStyle={{
                backgroundColor: "white",
            }}
            inputContainerStyle={{
                backgroundColor: "white",
            }}
            containerStyle={{
                backgroundColor: "#f1f1f1",
                borderRadius: 8,
            }}
        />
    );
}
