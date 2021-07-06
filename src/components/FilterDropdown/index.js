import * as React from "react"
import { useTheme } from '@emotion/react'
import styled from "@emotion/styled"
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    background: ${props => props.theme.secondary ?? "white"};
    color: ${props => props.theme.color ?? "white"};
    border-radius: 2.5px;
    padding: 5px 15px;
    width: 200px;

    @media (max-width: 1440px) {
        margin-top: 20px;
        min-height: 50px;
    }
    
    @media (min-width: 1440px) {
        margin: 0;
        max-width: 200px;
    }
`

const CustomDropdown = styled.div`
    height: 100%;
    position: relative;
    width: 100%;
    font-weight: 600;
`

const ClickAreaDropdown = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    height: inherit;
    background: ${props => props.theme.secondary ?? "white"};
    border-radius: 2.5px;
    padding: 0 1.25rem 0 0.75rem;

    ul {
        position: absolute;
        top: 4rem;
        left: -0.85rem;
        background: ${props => props.theme.secondary ?? "white"};
        width: 115%;
        border-radius: 2.5px;
        display: none;
        padding: 0;

        @media (max-width: 1440px) {
            top: 3rem;
        }
        
        &.open {
            display: flex;
            flex-direction: column;
        }
        
        li {
            list-style: none;
            padding: 0.3rem 1.25rem 0.3rem 1.5rem;
            cursor: pointer;
            &:first-of-type {
                padding-top: 1rem;
            }
            &:last-child {
                padding-bottom: 1rem;
            }
            &:hover,
            &.selected {
                background: hsla(0, 0%, 0%, 0.05);
                transition: background 0.3s;
            }
        }
    }
`

export default function FilterDropdown({ setDropdownValue }) {
    const theme = useTheme()
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();

    const handleSelect = item => {
        toggleDropdown();
        setSelectedValue(item);
        setDropdownValue(item);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const options = [
        { value: 'africa', label: 'Africa' },
        { value: 'america', label: 'America' },
        { value: 'asia', label: 'Asia' },
        { value: 'europe', label: 'Europe' },
        { value: 'oceania', label: 'Oceania' },
        { value: 'polar', label: 'Polar' },
    ]

    return (
        <Wrapper theme={theme}>
            <CustomDropdown>
                <ClickAreaDropdown onClick={toggleDropdown} theme={theme}>
                    <span>{selectedValue || 'Filter By Region'}</span>
                    {dropdownOpen ? (
                        <IoIosArrowUp/>
                    ) : (
                        <IoIosArrowDown />
                    )}
                    <ul className={dropdownOpen ? 'open' : ''}>
                        {(selectedValue && <li onClick={() => handleSelect('')}>
                            Filter By Region
                        </li>)}
                        {options.map(({ value, label }) => (
                            <li
                                key={label}
                                className={label === selectedValue ? 'selected' : ''}
                                onClick={() => handleSelect(label)}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </ClickAreaDropdown>
            </CustomDropdown>
        </Wrapper>
    )
}