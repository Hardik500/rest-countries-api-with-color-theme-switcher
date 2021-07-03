import React from "react"
import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"

const Wrapper = styled("div")`
    border: 2px solid green;
    padding: 10px;
`
export default function Layout({ children }) {
    return (
        <Wrapper>
            <Global
                styles={css`
                    div {
                        background: red;
                        color: white;
                    }
            `}/>
            {children}
        </Wrapper>
    )
}