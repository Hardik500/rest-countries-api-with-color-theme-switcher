import React from "react"
import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import { ThemeProvider } from '@emotion/react'
import useStickyState from '../Context/StickyState';

import Navbar from '../Navbar';

const themeLight = {
    primary: 'hsl(0, 0%, 98%)',
    secondary: 'hsl(0, 0%, 100%)',
    color: 'hsl(200, 15%, 8%)'
};

const themeDark = {
    primary: 'hsl(207, 26%, 17%)',
    secondary: 'hsl(209, 23%, 22%)',
    color: 'hsl(0, 0%, 100%)'
};

const Wrapper = styled("div")`
    margin: 0;
`

export default function Layout({ children }) {
    const [darkThemeEnabled, setDarkTheme] = useStickyState(true, 'theme');
    const theme = darkThemeEnabled ? themeDark : themeLight;

    const toggleDarkTheme = () => {
        setDarkTheme(!darkThemeEnabled);
    }


    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Global
                    styles={css`
                        body {
                            background: ${theme.primary};
                            color: ${theme.color};
                        }
                `}/>
                <Navbar darkThemeEnabled={darkThemeEnabled} toggleDarkTheme={toggleDarkTheme}/>
                {children}
            </Wrapper>
        </ThemeProvider>
    )
}