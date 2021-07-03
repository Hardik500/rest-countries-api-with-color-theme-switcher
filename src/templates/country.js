import * as React from "react"

import Layout from '../components/Layout';
import CountryDetail from "../components/CountryDetail";

export default function Country({pageContext}){
    
    return (
        <Layout>
            <CountryDetail data={pageContext}/>
        </Layout>
    )
}