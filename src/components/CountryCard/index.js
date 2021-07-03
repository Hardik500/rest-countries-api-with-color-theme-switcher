import * as React from "react"
import { useTheme } from '@emotion/react'
import styled from "@emotion/styled"

import Typography from '../Helper/Typography';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 50px;
    flex-direction: column;
    background: ${props => props.theme.secondary ?? "white"};
    box-shadow: 0px 0px 0px 10px ${props => props.theme.primary ?? "white"};
    max-width: 300px;
    cursor: pointer;
`

const ImageWrapper = styled.img`
    max-width: 100%;
`

const BodyWrapper = styled.div`
    padding: 20px 20px 40px 20px;
    background: inherit;
`

const TextWrapper = styled.div`
    display: flex;
    margin: 5px 0;
    background: inherit;
`

export default function CountryCard({ data }) {
    const { name, capital, population, region, flag } = data;
    const theme = useTheme()

    return (
        <Wrapper theme={theme}>
            <ImageWrapper src={flag} />
            <BodyWrapper>
                <Typography variant="h3" fontWeight={800}>{name}</Typography>
                <br/>
                <TextWrapper>
                    <Typography variant="h4" fontWeight={600}>Population:&nbsp;</Typography>
                    <Typography variant="h4">{population}</Typography>
                </TextWrapper>
                <TextWrapper>
                    <Typography variant="h4" fontWeight={600}>Region:&nbsp;</Typography>
                    <Typography variant="h4">{region}</Typography>
                </TextWrapper>
                <TextWrapper>
                    <Typography variant="h4" fontWeight={600}>Capital:&nbsp;</Typography>
                    <Typography variant="h4">{capital}</Typography>
                </TextWrapper>
            </BodyWrapper>
        </Wrapper>
    )
}