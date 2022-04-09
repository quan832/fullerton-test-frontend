import React from 'react'
import SearchBar from "material-ui-search-bar";
import { SearchBarStyled } from "./SearchBar.styled";

export default function SearchBarHeader({ cancelSearch, requestSearch, placeholder = "Search" }) {
    const [searched, setSearched] = React.useState("");

    return (
        <SearchBarStyled
            className=""
            value={searched}
            onChange={(newValue) => setSearched(newValue)}
            onRequestSearch={() => requestSearch(searched)}
            placeholder={placeholder}
        />
    )
}
