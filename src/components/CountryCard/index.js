import * as React from "react"
import { Link } from "gatsby"
import { useTheme } from '@emotion/react'
import styled from "@emotion/styled"
import slug from 'slug'
import LazyLoad from 'react-lazyload';

import Typography from '../Helper/Typography';

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 0px;
    border-radius: 5px;
    flex-direction: column;
    background: ${props => props.theme.secondary ?? "white"};
    max-width: 300px;
    cursor: pointer;
    box-shadow: 0 0 20px 2px ${props => props.theme.shadow ?? "white"};
`

export const ImageWrapper = styled.img`
    height: 200px;
    width: 300px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    object-fit: cover;
`

export const BodyWrapper = styled.div`
    padding: 20px 20px 40px 20px;
    background: inherit;
`

export const TextWrapper = styled.div`
    display: flex;
    margin: 5px 0;
    background: inherit;
`

const CountryCard = ({ data }) => {
    const { name, capital, population, region, flag } = data;
    const theme = useTheme()

    return (
        <Wrapper theme={theme}>
            <Link to={`/country/${slug(name, {lower: true})}`}>
                <LazyLoad once={true} offset={50} width={450}>
                    <ImageWrapper src={flag} alt={name}/>
                </LazyLoad>
                <BodyWrapper>
                    <Typography variant="h3" fontWeight={800}>{name}</Typography>
                    <br/>
                    <TextWrapper>
                        <Typography variant="h4" fontWeight={600}>Population:&nbsp;</Typography>
                        <Typography variant="h4">{population.toLocaleString()}</Typography>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography variant="h4" fontWeight={600}>Region:&nbsp;</Typography>
                        <Typography variant="h4">{region}</Typography>
                    </TextWrapper>
                    {capital && <TextWrapper>
                        <Typography variant="h4" fontWeight={600}>Capital:&nbsp;</Typography>
                        <Typography variant="h4">{capital}</Typography>
                    </TextWrapper>}
                </BodyWrapper>
            </Link>
        </Wrapper>
    )
}

export default React.memo(CountryCard);