import { StaticQuery, Link, graphql } from "gatsby"
import React from "react"

const Logo = () => {
  return (
    <StaticQuery
      query={graphql`
        query TitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => {
        return (
          <h1>
            <Link to="/">{data.site.siteMetadata?.title || `Title`}</Link>
          </h1>
        )
      }}
    />
  )
}

export default Logo
