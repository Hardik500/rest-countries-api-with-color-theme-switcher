import '../style.css'

import * as React from "react"
import styled from "@emotion/styled"

import Layout from '../components/Layout';
import CountryCard from '../components/CountryCard';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const IndexPage = () => {
  const [countriesData, setCountriesData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://restcountries.eu/rest/v2/all?fields=name;capital;region;population;flag");
      const data = await result.json()
      setCountriesData(data);
    }

    fetchData();
  }, [])

  return (
    <Layout>
      <Wrapper>
      {countriesData.length && countriesData.map((countryData, index) => <CountryCard data={countryData} key={index}/>)}
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
