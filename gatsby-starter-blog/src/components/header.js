import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import setting from "/customizing-setting"

const HEADER_NAV_ITEM = setting.pages

const Header = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <header>
      <div>
        {/* <div>
          <Link to="/">{site.siteMetadata.title}</Link>
        </div> */}

        <HeaderNavList>
          {HEADER_NAV_ITEM.map((item, index) => {
            if (item.isExternal) {
              return (
                <HeaderNavListItem key={index}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </HeaderNavListItem>
              )
            }

            return (
              <HeaderNavListItem key={index}>
                <Link to={item.url}>{item.label}</Link>
              </HeaderNavListItem>
            )
          })}
        </HeaderNavList>
      </div>
    </header>
  )
}

export default Header

const HeaderNavList = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

const HeaderNavListItem = ({ children }) => {
  return <div>{children}</div>
}
