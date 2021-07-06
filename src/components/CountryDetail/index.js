import * as React from "react"
import { Link, navigate } from "gatsby"
import { useTheme } from '@emotion/react'
import styled from "@emotion/styled"
import slugify from 'slugify'
import { BsArrowLeft } from 'react-icons/bs';
import { StageSpinner } from "react-spinners-kit";

import Typography from '../Helper/Typography';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px 50px;
    cursor: pointer;
    transition: all 0.66s ease-out;
    
    @media (min-width: 1440px) {
        margin: 75px 100px;
        flex-direction: row;
        align-items: center;
    }
    `

export const BackButton = styled.button`
    border: none;
    background: ${props => props.theme.secondary ?? "white"};
    color: ${props => props.theme.color ?? "white"};
    padding: 10px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 110px;
    border-radius: 5px;
    cursor: pointer;
    
    @media (min-width: 1440px) {
        min-width: 110px;
    }
`

export const ImageWrapper = styled.img`
    max-width: 350px;
    transition: all 0.66s ease-out;
    
    @media (min-width: 1440px) {
        max-height: 350px;
        max-width: 500px;
    }
`
const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin: 30px 0;

    @media (min-width: 1440px) {
        flex-direction: row;
        margin: 20px 0;
        max-width: 750px;
    }
`

const FlexDiv = styled.div`
    margin-top: 20px;

    @media (min-width: 1440px) {
        margin-left: 20px;
        margin-top: 0px;
    }
`

export const BodyWrapper = styled.div`
    background: inherit;

    @media (max-width: 1440px) {
        margin-top: 20px;
    }
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
    const [imageLoaded, setImageLoaded] = React.useState(false);

    return (
        <div>
            <Wrapper theme={theme} style={{justifyContent: 'flex-start'}}>
                <BackButton theme={theme} onClick={() => navigate(-1)}>
                    <BsArrowLeft size={20}/>
                    <Typography variant="h5" fontWeight={600}>Back</Typography>
                </BackButton>
            </Wrapper>
            <Wrapper theme={theme}>
                {!imageLoaded && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '500px'}}>
                    <StageSpinner loading={!imageLoaded}/>
                </div>}
                <ImageWrapper src={flag} className={imageLoaded ? 'loaded' : ''} onLoad={() => setImageLoaded(true)}/>
                <BodyWrapper>
                    <Typography variant="h2" fontWeight={800}>{name}</Typography>
                    <FlexWrapper style={{ justifyContent: 'space-between' }}>
                        <div>
                            <TextWrapper>
                                <Typography variant="h4" fontWeight={600}>Native Name:&nbsp;</Typography>
                                <Typography variant="h4">{nativeName}</Typography>
                            </TextWrapper>
                            <TextWrapper>
                                <Typography variant="h4" fontWeight={600}>Population:&nbsp;</Typography>
                                <Typography variant="h4">{population?.toLocaleString()}</Typography>
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
                        <FlexDiv>
                            <TextWrapper>
                                <Typography variant="h4" fontWeight={600}>Top Level Domain:&nbsp;</Typography>
                                <Typography variant="h4">{topLevelDomain?.[0]}</Typography>
                            </TextWrapper>
                            <TextWrapper>
                                <Typography variant="h4" fontWeight={600}>Currencies:&nbsp;</Typography>
                                <Typography variant="h4">{currencies?.map(({ code }, index) => code + ((index !== currencies.length - 1) ? ", " : ""))}</Typography>
                            </TextWrapper>
                            <TextWrapper>
                                <Typography variant="h4" fontWeight={600}>Languages:&nbsp;</Typography>
                                <Typography variant="h4">{languages?.map(({ name }, index) => name + ((index !== languages.length - 1) ? ", " : ""))}</Typography>
                            </TextWrapper>
                        </FlexDiv>
                    </FlexWrapper>
                    <FlexWrapper>
                        <TextWrapper style={{ minWidth: '150px' }}>
                            <Typography variant="h3" fontWeight={600}>Border Countries:&nbsp;</Typography>
                        </TextWrapper>
                        <TextWrapper>
                            <Typography variant="h4">{borders?.map((country, index) => <CountryWrapper key={index} theme={theme}><Link to={`/country/${slugify(country, { lower: true })}`}>{country}</Link></CountryWrapper>)}</Typography>
                        </TextWrapper>
                    </FlexWrapper>
                </BodyWrapper>
            </Wrapper>
        </div>
    )
}