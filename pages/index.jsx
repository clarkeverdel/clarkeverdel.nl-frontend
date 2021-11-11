import React from 'react';
import BodyClassName from 'react-body-classname';
import Layout from '../src/components/Layout';
import PageWrapper from '../src/components/PageWrapper';
import { Config } from '../config';

import Opening from '../src/components/HomeOpening';
import RecentWork from '../src/components/RecentWork';
import AboutMe from '../src/components/AboutMe';

// import stylesheet from '../src/styles/pages/homepage.module.scss';

const Index = ({projects, page}) => {

  return (
    <BodyClassName className="page-home">
      <PageWrapper>
        <Layout title={(page && page.title && page.title.rendered ? page.title.rendered : false)}>
          <Opening />
          <RecentWork projects={projects} />
          <AboutMe />
        </Layout>
      </PageWrapper>
    </BodyClassName>
  );
};

export async function getStaticProps() {
  const pageRes = await fetch(
    `${Config.apiUrl}/wp-json/postlight/v1/page?slug=homepage`,
  );
  const page = await pageRes.json();

  const projectsRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/projects?_embed`,
  );
  const projects = await projectsRes.json();

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
      projects
    }
  };
}

export default Index; // ;
