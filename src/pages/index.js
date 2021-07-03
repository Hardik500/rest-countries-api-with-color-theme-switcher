import * as React from "react"
import { jsx, ThemeProvider, useTheme } from '@emotion/react'
import '../style.css'

const white = '#FFFFFF';
const black = "#161617";
const gray = "#F8F8F9";

const themeLight = {
  background: gray,
  body: black
};

const themeDark = {
  background: black,
  body: white
};

const ChildComponent = ({darkThemeEnabled, toggleDarkTheme}) => {
  const theme = useTheme()

  return (
    <div>
      <h1 style={{background: theme.background, color: theme.body}}>Hello World</h1>
      <button onClick={() => toggleDarkTheme(!darkThemeEnabled)}>Change Theme</button>
    </div>
  )
}

// markup
const IndexPage = () => {
  const [darkThemeEnabled, toggleDarkTheme] = React.useState(true);
  const theme = darkThemeEnabled ? themeDark : themeLight;

  return (
    <ThemeProvider theme={theme}>
      <main style={{ background: theme.background}}>
        <title>Home Page</title>
        <ChildComponent darkThemeEnabled={darkThemeEnabled} toggleDarkTheme={toggleDarkTheme}/>
      </main>
    </ThemeProvider>
  )
}

export default IndexPage
