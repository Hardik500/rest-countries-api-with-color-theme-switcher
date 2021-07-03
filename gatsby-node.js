//gatsby-node.js

import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';
import slugify from 'slugify'

async function getBorderCountries(borders){
    const countries = [];

    for(let i = 0; i < borders.length; i++){
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${borders[i]}?fields=name`)
        const country = await response.json() 
        countries.push(country.name);
    }

    return countries;
}

async function turnCountriesIntoPages({ graphql, actions }) {
    // 1. Get a template for this page
    const countryTemplate = path.resolve('./src/templates/country.js');
    // 2. Query all Countries
    const response = await fetch("https://restcountries.eu/rest/v2/all")
    const countries = await response.json()

    
    // 3. Loop over each country and create a page for that country
    countries.forEach(async (country) => {
        const borderCountries = await getBorderCountries(country.borders);

        actions.createPage({
            path: `country/${slugify(country.name, {lower: true})}`,
            component: countryTemplate,
            context: {
                name: country.name,
                capital: country.capital,
                population: country.population,
                region: country.region,
                subregion: country.subregion,
                flag: country.flag,
                currencies: country.currencies,
                languages: country.languages,
                borders: borderCountries,
                topLevelDomain: country.topLevelDomain,
                nativeName: country.nativeName
            },
        });
    });
}

export async function createPages(params) {
    // Create pages dynamically
    await Promise.all([
        turnCountriesIntoPages(params),
    ]);
}