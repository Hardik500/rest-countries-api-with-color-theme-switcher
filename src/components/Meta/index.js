import React from "react"
import { Helmet } from "react-helmet"

export default function Meta() {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Where in the world?</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>
    )
}