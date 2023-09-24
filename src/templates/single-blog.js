import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'
import * as style from "../styles/singleBlog.module.scss"


const SingleBlog = (props) => {
  console.log(props)
  return (
    <Layout>
      <Seo title={props.data.contentfulBlog.title} description={props.data.contentfulBlog.excerpt} />
      <div className={style.hero}>
        <GatsbyImage
          image={props.data.contentfulBlog.image.gatsbyImageData}
          alt="blog-image"
        />
      </div>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h1>{props.data.contentfulBlog.title}</h1>
          <p>{props.data.contentfulBlog.date}</p>
          <div dangerouslySetInnerHTML={{ __html: props.data.contentfulBlog.textBody.childMarkdownRemark.html }} />
        </div>
      </div>
    </Layout>
  )
}

export default SingleBlog

/*
このslugは、createPage APIを通じてこのコンポーネントにcontextとして渡され、
結果的にこのGraphQLクエリの$slug変数に代入されます。
このデータはpropsとしてコンポーネントに渡され、Reactで表示を行います。

このクエリが受け取る引数（$slug）の型（String!）を指定しています。!はこのフィールドが必須であることを示しています。
fields オブジェクト内の slug フィールドが引数 $slug と等しい(eq) MarkdownRemark ノードを検索しています。
*/
export const query = graphql`
  query ContentfulSingleBlogQuery ($slug: String!) {
    contentfulBlog(slug: {eq: $slug}) {
      date(formatString: "YYYY-MM-DD")
      excerpt
      title
      image {
        gatsbyImageData(formats: AUTO, placeholder: BLURRED, quality: 90, width: 1000)
      }
      textBody {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
