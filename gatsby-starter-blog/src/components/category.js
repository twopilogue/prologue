import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import setting from "/customizing-setting"

const CATEGORY_ITEM = setting.category

const Category = () => {
  return (
    <StaticQuery
      query={graphql`
        query CategoryQuery {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
          ) {
            categoryList: distinct(field: frontmatter___category)
            nodes {
              excerpt
              fields {
                slug
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
              }
            }
          }
        }
      `}
      render={data => (
        <div className="category">
          <nav>
            {CATEGORY_ITEM.map(category => (
              <li key={category}>
                <Link
                  to={
                    category === "전체보기"
                      ? `/all-posts`
                      : data.allMarkdownRemark.categoryList.includes(category)
                      ? `/${category}/`
                      : `/empty-posts`
                  }
                >
                  {category}
                </Link>
              </li>
            ))}
          </nav>
        </div>
      )}
    />
  )
}

export default Category
