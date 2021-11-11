import React, { Component } from 'react';
import Error from 'next/error';
import Layout from '../src/components/Layout';
import PageWrapper from '../src/components/PageWrapper';
import Menu from '../src/components/Menu';
import { Config } from '../config';

class Category extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const categoriesRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/categories?slug=${slug}`,
    );
    const categories = await categoriesRes.json();
    if (categories.length > 0) {
      const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${
          categories[0].id
        }`,
      );
      const posts = await postsRes.json();
      return { categories, posts };
    }
    return { categories };
  }

  render(props) {
    const { categories, posts, headerMenu } = props;

    if (categories.length === 0) return <Error statusCode={404} />;

    // const postList = posts.map((post, index) => (
    //   <ul key={index}>
    //     <li>
    //       <Link
    //         as={`/post/${post.slug}`}
    //         href={`/post?slug=${post.slug}&apiRoute=post`}
    //       >
    //         <a>{post.title.rendered}</a>
    //       </Link>
    //     </li>
    //   </ul>
    // ));
    return (
      <Layout>
        <Menu menu={headerMenu} />
        <h1>
          {categories[0].name}
          {' '}
Posts
        </h1>
        {posts}
      </Layout>
    );
  }
}

export default PageWrapper(Category);
