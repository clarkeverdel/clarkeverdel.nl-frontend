import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import BodyClassName from 'react-body-classname';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import { Config } from '../config';

import Opening from '../components/HomeOpening';
import RecentWork from '../components/RecentWork';
import AboutMe from '../components/AboutMe';

import stylesheet from '../src/styles/pages/homepage.scss';

class Index extends Component {
  static async getInitialProps(context) {
    const pageRes = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/page?slug=homepage`,
    );
    const page = await pageRes.json();

    // const postsRes = await fetch(
    //   `${Config.apiUrl}/wp-json/wp/v2/posts?_embed`,
    // );
    // const posts = await postsRes.json();

    const pagesRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/pages?_embed`,
    );
    const pages = await pagesRes.json();

    const projectsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/projects?_embed`,
    );
    const projects = await projectsRes.json();

    return {
      page, pages, projects
    };
  }

  render() {
    // const posts = this.props.posts.map((post, index) => (
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
    // const projects = this.props.projects.map((project, index) => (
    //   <ul key={index}>
    //     <li>
    //       <Link
    //         as={`/project/${project.slug}`}
    //         href={`/post?slug=${project.slug}&apiRoute=projects`}
    //       >
    //         <a>{project.title.rendered}</a>
    //       </Link>
    //     </li>
    //   </ul>
    // ));
    // const pages = this.props.pages.map((page, index) => (
    //   <ul key={index}>
    //     <li>
    //       <Link
    //         as={`/${page.slug}`}
    //         href={`/post?slug=${page.slug}&apiRoute=page`}
    //       >
    //         <a>{page.title.rendered}</a>
    //       </Link>
    //     </li>
    //   </ul>
    // ));

    const { headerMenu, projects, page } = this.props;

    return (
      <BodyClassName className="page-home">

        <Layout title={(page && page.title && page.title.rendered ? page.title.rendered : false)}>

          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

          <Menu menu={headerMenu} />
          <Opening />
          <RecentWork projects={projects} />
          <AboutMe />

          { /*
                <h1 dangerouslySetInnerHTML={{__html: this.props.post.title.rendered }}></h1>
                <span className="subtitle">Design & Brilliance</span>
                <div
                    dangerouslySetInnerHTML={{
                        __html: this.props.page.content.rendered
                    }}
                />


                <h2>All your posts</h2>
                {posts}
                <h2>All your pages</h2>
                {pages}
                <h2>All your projects</h2>
                {projects}

                */}
        </Layout>
      </BodyClassName>
    );
  }
}

export default PageWrapper(Index);
