import React from "react"
import { Global, css } from "@emotion/react"
import { ThemeProvider } from '@emotion/react'
import styled from "@emotion/styled"
import useStickyState from '../Context/StickyState';

import Meta from '../Meta'
import Navbar from '../Navbar';

const themeLight = {
    primary: 'hsl(0, 0%, 98%)',
    secondary: 'hsl(0, 0%, 100%)',
    color: 'hsl(200, 15%, 8%)',
    shadow: 'hsl(0, 0%, 90%)'
};

const themeDark = {
    primary: 'hsl(207, 26%, 17%)',
    secondary: 'hsl(209, 23%, 22%)',
    color: 'hsl(0, 0%, 100%)',
    shadow: 'hsl(203, 29%, 14%)'
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
                <Meta/>
                <Navbar darkThemeEnabled={darkThemeEnabled} toggleDarkTheme={toggleDarkTheme}/>
                {children}
            </Wrapper>
        </ThemeProvider>
    )
}