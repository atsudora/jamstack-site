import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

import * as style from "../styles/blog.module.scss"


const Blog = (props) => {
  console.log(props)
  return (
    <Layout>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h1>Blog</h1>
          <p>弊社サービスやお客様の声などを紹介します。</p>
          {props.data.allContentfulBlog.edges.map((SingleBlog, index) => (
            <div className={style.blogCard} key={index}>
              <div className={style.textContainer}>
                <h3>{SingleBlog.node.title}</h3>
                <p>{SingleBlog.node.excerpt}</p>
                <p>{SingleBlog.node.date}</p>
                <Link to={SingleBlog.node.slug}>Read More</Link>
              </div>
              <GatsbyImage
                image={SingleBlog.node.image.gatsbyImageData}
                alt="card-image"
                className={style.cardImg}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Blog


export const query = graphql`
  query ContentfulBlogQuery {
    allContentfulBlog(sort: {date: DESC}) {
      edges {
        node {
          id
          title
          date(formatString: "YYYY-MM-DD")
          excerpt
          slug
          image {
            gatsbyImageData(formats: AUTO, quality: 90, placeholder: BLURRED)
          }
        }
      }
    }
  }
`