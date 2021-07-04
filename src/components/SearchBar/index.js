import * as React from "react"
import { useTheme } from '@emotion/react'
import styled from "@emotion/styled"
import {BiSearch} from 'react-icons/bi';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    background: ${props => props.theme.secondary ?? "white"};
    color: ${props => props.theme.color ?? "white"};
    border-radius: 5px;
    padding: 5px 15px;
    width: 100%;
    
    @media (min-width: 1440px) {
        max-width: 500px;
    }
`

const SearchComponent = styled.input`
    padding: 10px 15px;
    color: ${props => props.theme.color ?? "white"};
    background: ${props => props.theme.secondary ?? "white"};
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 16px;

    ::placeholder {
        color: ${props => props.theme.color ?? "white"};
    }
`

export default function SearchBar({setSearchText}){
    const theme = useTheme()

    return (
        <Wrapper theme={theme}>
            <BiSearch size={20}/>
            <SearchComponent theme={theme} onChange={(e) => setSearchText(e.target.value)} type="string" placeholder="Search for a country...." />
        </Wrapper>
    )
}