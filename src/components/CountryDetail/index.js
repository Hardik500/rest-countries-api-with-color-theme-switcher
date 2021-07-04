import * as React from "react"
import { Link } from "gatsby"
import { useTheme } from '@emotion/react'
import styled from "@emotion/styled"
import slugify from 'slugify'

import Typography from '../Helper/Typography';

export const Wrapper = styled.div`
    display: flex;
    margin: 30px 50px;
    flex-direction: column;
    cursor: pointer;

    @media (min-width: 1440px) {
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
`

export const ImageWrapper = styled.img`
    max-width: 350px;

    @media (min-width: 1440px) {
        max-width: 500px;
        margin-right: 100px;
    }
`
const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 1440px) {
        flex-direction: row;
        margin: 20px 0;
    }
`

export const BodyWrapper = styled.div`
    background: inherit;
`

export const TextWrapper = styled.div`
    display: flex;
    margin: 10px 0;
    background: inherit;
    flex-wrap: wrap;
    align-items: center;

    @media (max-width: 1440px) {
        width: 100%;
    }
`

export const CountryWrapper = styled.div`
    display: inline-block;
    background: ${props => props.theme.secondary ?? "white"};
    box-shadow: 0px 0px 0px 10px ${props => props.theme.primary ?? "white"};
    margin: 5px 10px 5px 0;
    padding: 5px 15px;
    border-radius: 2px;
`

export default function CountryCard({ data }) {
    const { name, capital, population, region, subregion, nativeName, flag, currencies, languages, borders, topLevelDomain } = data;
    const theme = useTheme()

    return (
        <Wrapper theme={theme}>
            <ImageWrapper src={flag} />
            <BodyWrapper>
                <Typography variant="h2" fontWeight={800}>{name}</Typography>
                <FlexWrapper>
                    <div>
                        <TextWrapper>
                            <Typography variant="h4" fontWeight={600}>Native Name:&nbsp;</Typography>
                            <Typography variant="h4">{nativeName}</Typography>
                        </TextWrapper>
                        <TextWrapper>
                            <Typography variant="h4" fontWeight={600}>Population:&nbsp;</Typography>
                            <Typography variant="h4">{population}</Typography>
                        </TextWrapper>
                        <TextWrapper>
                            <Typography variant="h4" fontWeight={600}>Region:&nbsp;</Typography>
                            <Typography variant="h4">{region}</Typography>
                        </TextWrapper>
                        <TextWrapper>
                            <Typography variant="h4" fontWeight={600}>Sub Region:&nbsp;</Typography>
                            <Typography variant="h4">{subregion}</Typography>
                        </TextWrapper>
                        <TextWrapper>
                            <Typography variant="h4" fontWeight={600}>Capital:&nbsp;</Typography>
                            <Typography variant="h4">{capital}</Typography>
                        </TextWrapper>
                    </div>
                    <div>
                        <TextWrapper>
                            <Typography variant="h4" fontWeight={600}>Top Level Domain:&nbsp;</Typography>
                            <Typography variant="h4">{topLevelDomain[0]}</Typography>
                        </TextWrapper>
                        <TextWrapper>
                            <Typography variant="h4" fontWeight={600}>Currencies:&nbsp;</Typography>
                            <Typography variant="h4">{currencies.map(({ code }, index) => code + ((index !== currencies.length - 1) ? ", " : ""))}</Typography>
                        </TextWrapper>
                        <TextWrapper>
                            <Typography variant="h4" fontWeight={600}>Languages:&nbsp;</Typography>
                            <Typography variant="h4">{languages.map(({ name }, index) => name + ((index !== languages.length - 1) ? ", " : ""))}</Typography>
                        </TextWrapper>
                    </div>
                </FlexWrapper>
                <FlexWrapper>
                    <TextWrapper>
                        <Typography variant="h4" fontWeight={600}>Border Countries:&nbsp;</Typography>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography variant="h4">{borders.map((country, index) => <CountryWrapper key={index} theme={theme}><Link to={`/country/${slugify(country, {lower: true})}`}>{country}</Link></CountryWrapper>)}</Typography>
                    </TextWrapper>
                </FlexWrapper>
            </BodyWrapper>
        </Wrapper>
    )
}