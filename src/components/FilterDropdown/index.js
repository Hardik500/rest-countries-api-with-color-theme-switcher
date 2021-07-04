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
    width: 200px;
    margin-top: 20px;
    
    @media (min-width: 1440px) {
        margin: 0;
        max-width: 200px;
    }
`

const SelectComponent = styled.select`
    padding: 10px 15px;
    color: ${props => props.theme.color ?? "white"};
    background: ${props => props.theme.secondary ?? "white"};
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 16px;
`

const OptionComponent = styled.option`
    padding: 10px 15px;
    color: ${props => props.theme.color ?? "white"};
    background: ${props => props.theme.secondary ?? "white"};
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 16px;
`

export default function FilterDropdown({setDropdownValue}){
    const theme = useTheme()

    return (
        <Wrapper theme={theme}>
            <SelectComponent name="region" onChange={(e) => setDropdownValue(e.target.value === "all" ? "" : e.target.value)}>
                <OptionComponent value="all">Filter By Region</OptionComponent>
                <OptionComponent value="africa">Africa</OptionComponent>
                <OptionComponent value="america">America</OptionComponent>
                <OptionComponent value="asia">Asia</OptionComponent>
                <OptionComponent value="europe">Europe</OptionComponent>
                <OptionComponent value="oceania">Oceania</OptionComponent>
            </SelectComponent>
        </Wrapper>
    )
}