import '../style.css'

import * as React from "react"
import fetch from 'isomorphic-fetch';
import useSWR from 'swr'
import styled from "@emotion/styled"
import { useTheme } from '@emotion/react'
import { MagicSpinner } from "react-spinners-kit";

import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import CountryCard from '../components/CountryCard';

const Wrapper = styled.div`
  margin: 20px 40px;

  @media (min-width: 1440px) {
    margin: 20px 100px;
  }
`

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  
  @media (max-width: 1440px) {
    margin: 0;
    flex-direction: column;
  }
`

const CountryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(340px, 1fr) );
  justify-items: center;
  transition: all 0.66s ease-out;

  @media (max-width: 620px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`

const fetcher = url => fetch(url).then(r => r.json())

const IndexPage = () => {
  const theme = useTheme()
  const [searchText, setSearchText] = React.useState("");
  const [dropdownValue, setDropdownValue] = React.useState("");
  const { data: countriesData, error } = useSWR('https://restcountries.eu/rest/v2/all?fields=name;capital;region;population;flag', fetcher)
  
  if (error) return "An error has occurred.";
  if (!countriesData) return <LoaderContainer><MagicSpinner size={100} color={theme.color} loading={true} /></LoaderContainer>


  return (
      <Wrapper>
        <FilterWrapper>
          <SearchBar setSearchText={setSearchText}/>
          <FilterDropdown setDropdownValue={setDropdownValue}/>
        </FilterWrapper>
        <CountryWrapper>
          {
            countriesData
              ?.filter((countryData) => countryData.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
              ?.filter((countryData) => countryData.region.toLocaleLowerCase().includes(dropdownValue.toLocaleLowerCase()))
              ?.map((countryData, index) => <CountryCard data={countryData} key={index} />)
          }
        </CountryWrapper>
      </Wrapper>
  )
}

export default IndexPage
