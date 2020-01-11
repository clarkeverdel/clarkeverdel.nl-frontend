import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import { Config } from '../config';

class Project extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;

    const res = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`,
    );
    const project = await res.json();
    return { project };
  }

  render() {
    const {project, headerMenu} = this.props;
    if (!project.title) return <Error statusCode={404} />;

    return (
      <Layout title={project.title.rendered}>
        <Menu menu={headerMenu} />

        <div className="container">
          <h1 dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
          <div
            dangerouslySetInnerHTML={{
              __html: project.content.rendered,
            }}
          />
        </div>
      </Layout>
    );
  }
}

export default PageWrapper(Project);
