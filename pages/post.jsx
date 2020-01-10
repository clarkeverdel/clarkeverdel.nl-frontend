import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import { Config } from '../config';

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`,
    );
    const post = await res.json();
    return { post };
  }

  render() {
    const {post} = this.props;
    if (!post.title) return <Error statusCode={404} />;

    return (
      <Layout title={post.title.rendered}>
        <Menu menu={this.props.headerMenu} />

        <div className="container">
          <h1 dangerouslySetInnerHTML={{ __html: this.props.post.title.rendered }} />
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.post.content.rendered,
            }}
          />
        </div>
      </Layout>
    );
  }
}

export default PageWrapper(Post);
