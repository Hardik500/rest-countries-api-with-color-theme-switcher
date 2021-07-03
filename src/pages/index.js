import '../style.css'

import * as React from "react"
import fetch from 'isomorphic-fetch';
import useSWR from 'swr'
import styled from "@emotion/styled"

import SearchBar from '../components/SearchBar';
import Layout from '../components/Layout';
import CountryCard from '../components/CountryCard';

const Wrapper = styled.div`
  margin: 20px 40px;

  @media (min-width: 1440px) {
    margin: 20px 100px;
  }
`

const FilterWrapper = styled.div`
  display: flex;
`

const CountryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const fetcher = url => fetch(url).then(r => r.json())

const IndexPage = () => {
  const [searchText, setSearchText] = React.useState("");
  const { data: countriesData, error } = useSWR('https://restcountries.eu/rest/v2/all?fields=name;capital;region;population;flag', fetcher)

  if (error) return "An error has occurred.";
  if (!countriesData) return "Loading...";

  return (
    <Layout>
      <Wrapper>
        <FilterWrapper>
          <SearchBar setSearchText={setSearchText}/>
        </FilterWrapper>
        <CountryWrapper>
          {
            countriesData
              ?.filter((countryData) => countryData.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
              ?.map((countryData, index) => <CountryCard data={countryData} key={index} />)
          }
        </CountryWrapper>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
