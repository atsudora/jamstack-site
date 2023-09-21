const path = require(`path`)

/* 
createPagesはGatsbyの別のライフサイクルAPIで、Gatsbyがページを生成する際に呼び出されます。
GraphQLクエリを使用して、すでにslugフィールドを持つすべてのMarkdownRemarkノードを取得します。
*/
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allContentfulBlog {
        edges {
          node {
            slug
          }
        }
      }
    }`
  )

  result.data.allContentfulBlog.edges.forEach(({ node }) => {
    createPage({
    // 取得した各MarkdownRemarkノードに対して、createPage関数を呼び出してページを生成します。
      path: node.slug,
      component: path.resolve(`./src/templates/single-blog.js`),
      context: {
        slug: node.slug,
      }
      /* 
      生成するページのパスはnode.fields.slugに設定されます。
			生成するページのテンプレート（Reactコンポーネント）は./src/templates/single-blog.jsに設定されます。
			生成するページのcontextにはslugが渡され、これはテンプレート内のGraphQLクエリで使用できます。
      */
    })
  });
}
