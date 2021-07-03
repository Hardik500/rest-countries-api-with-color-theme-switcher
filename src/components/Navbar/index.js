import * as React from "react"
import styled from "@emotion/styled"
import { useTheme } from '@emotion/react'
import { BiSun } from 'react-icons/bi';
import { BsMoon } from 'react-icons/bs';

import Typography from '../Helper/Typography';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 30px 15px;
`

const NightModeBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: none;
    border: none;
    min-width: 100px;
    cursor: pointer;
`

export default function Navbar({ darkThemeEnabled, toggleDarkTheme }) {
    const theme = useTheme()

    return (
        <Wrapper style={{ background: theme.secondary }}>
            <Typography variant="h4" fontWeight={600}>Where in the world?</Typography>

            <NightModeBtn onClick={toggleDarkTheme} style={{color: theme.color}}>
                {
                    darkThemeEnabled ?
                        (<><BsMoon /> <Typography variant="h5" fontWeight={600}>Dark Mode</Typography></>)
                        :
                        (<><BiSun /> <Typography variant="h5" fontWeight={600}>Light Mode</Typography></>)
                }
            </NightModeBtn>
        </Wrapper>
    )
}