import * as React from "react"

import CountryDetail from "../components/CountryDetail";

export default function Country({pageContext}){
    
    return (
        <CountryDetail data={pageContext}/>
    )
}