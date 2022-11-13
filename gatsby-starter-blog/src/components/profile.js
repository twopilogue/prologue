/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="profile">
      <div className="display_column">
        <StaticImage
          className="profile-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={200}
          height={200}
          alt="Profile picture"
        />
      </div>
      <div>
        {author?.name && (
          <div>
            <p className="name">
              <strong>{author.name}</strong>
            </p>
            <p>{author?.summary || null}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Bio
