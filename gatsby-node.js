const axios = require("axios")

exports.sourceNodes = (
    { actions, createNodeId, createContentDigest },
    configOptions
) => {
    const { createNode } = actions
    const API = `https://restcountries.eu/rest/v2`

    delete configOptions.plugins

    return new Promise((resolve, reject) => {
        // Fetch data and return items array
        axios.get(`${API}/all`).then(async res => {
            let countryMapping = {};

            for (let i = 0; i < res.data.length; i++) {
                const country = res.data[i];
                countryMapping[country.alpha3Code] = country.name;
            }

            for (let i = 0; i < res.data.length; i++) {
                let borderCountries = [];
                const country = res.data[i];

                for(let i = 0; i < country.borders.length; i++){
                    let countryName = country.borders[i];
                    borderCountries.push(countryMapping[countryName])
                }

                const countryData = { ...country, borders: borderCountries }

                console.log(countryData);

                const nodeMeta = {
                    id: createNodeId(`country-id-${country.numericCode}`),
                    parent: null,
                    children: [],
                    internal: {
                        type: "countries",
                        content: JSON.stringify(countryData),
                        contentDigest: createContentDigest(countryData),
                    },
                }
                const node = Object.assign({}, countryData, nodeMeta)
                createNode(node)
            }
            resolve()
        })
    })
}

exports.createPages = ({ graphql, actions }) => {
    const path = require("path")
    const slug = require("slug")
    const slash = require("slash")
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        graphql(`
        {
            allCountries {
            edges {
                    node {
                        name
                        alpha3Code
                        capital
                        population
                        region
                        subregion
                        flag
                        currencies {
                            code
                        }
                        languages {
                            name
                        }
                        borders
                        topLevelDomain
                        nativeName
                    }
                }
            }
        }
    `).then(result => {
            const countryTemplate = path.resolve(`./src/templates/country.js`)
            result.data.allCountries.edges.forEach(({ node }) => {
                createPage({
                    path: `country/${slug(node.name, { lower: true })}`,
                    component: slash(countryTemplate),
                    context: {
                        countryId: node.alpha3Code,
                        name: node.name,
                        capital: node.capital,
                        population: node.population,
                        region: node.region,
                        subregion: node.subregion,
                        flag: node.flag,
                        currencies: node.currencies,
                        languages: node.languages,
                        borders: node.borders,
                        topLevelDomain: node.topLevelDomain,
                        nativeName: node.nativeName
                    },
                })
            })
        })
        resolve()
    }).catch(error => {
        console.log(error)
        reject()
    })
}