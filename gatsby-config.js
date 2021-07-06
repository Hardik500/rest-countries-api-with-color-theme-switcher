module.exports = {
  siteMetadata: {
    siteUrl: "https://restcountriesapi.gatsbyjs.io/",
    title: "Where in the world?",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-rest-countries-api",
        short_name: "Where in the world?",
        start_url: "/",
        background_color: "#fafafa",
        theme_color: "#fafafa",
        display: "minimal-ui",
        icon: "src/images/icon.png",
      },
    },
  ],
};
