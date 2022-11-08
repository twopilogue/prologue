import { StaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"

const Title = () => {
  const height = 300
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
          <StaticImage
            height={height}
            src="../images/background-default.jpg"
            alt="titleImg"
          />
        )
      }}
    />
  )
}

export default Title
