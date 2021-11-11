import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Layout from '../src/components/Layout';
import PageWrapper from '../src/components/PageWrapper';
import Menu from '../src/components/Menu';
import { Config } from '../config';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.url = props.url;
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    const { id, wpnonce } = this.props.url.query;

    fetch(
      `${
        Config.apiUrl
      }/wp-json/postlight/v1/post/preview?id=${id}&_wpnonce=${wpnonce}`,
      { credentials: 'include' }, // required for cookie nonce auth
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          post: res,
        });
      });
  }

  render(props) {
    const { headerMenu } = props;

    if (
      this.state.post
            && this.state.post.code
            && this.state.post.code === 'rest_cookie_invalid_nonce'
    ) return <Error statusCode={404} />;

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <h1>{this.state.post ? this.state.post.title.rendered : ''}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.post
              ? this.state.post.content.rendered
              : '',
          }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Preview);
