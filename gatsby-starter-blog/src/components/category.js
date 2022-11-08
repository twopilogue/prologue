import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

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
            {data.allMarkdownRemark.categoryList.map(category => (
              <li key={category}>
                <Link to={`/${category}/`}>{category}</Link>
              </li>
            ))}
          </nav>
        </div>
      )}
    />
  )
}

export default Category
