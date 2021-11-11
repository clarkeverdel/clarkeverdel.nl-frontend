import React, { Component } from 'react';
import Error from 'next/error';
import Layout from '../src/components/Layout';
import PageWrapper from '../src/components/PageWrapper';
import { Config } from '../config';

const Post = ({ post }) => {
  if (!post.title) return <Error statusCode={404} />;

  return (
    <PageWrapper>
      <Layout title={post.title.rendered}>
        <div className="container">
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
        </div>
      </Layout>
    </PageWrapper>
  );
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const res = await fetch(
    `${Config.apiUrl}/wp-json/postlight/v1/page?slug=${slug}`,
  );
  const post = await res.json();

  return {
    props: {
      post
    }
  };
}

export async function getStaticPaths(){
  const pagesRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/pages?_embed`,
  );
  const pages = await pagesRes.json();
  const allPages = pages.map(page => {
    return {
      params: {
        slug: page.slug
      }
    }
  }).filter( ({slug}) => slug === 'contact');

  return {
    paths: allPages,
    fallback: false
  }

}

export default Post;
