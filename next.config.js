const path = require('path')
const glob = require('glob')
const fetch = require('isomorphic-unfetch')
const withTM = require('next-transpile-modules');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(withTM({

  transpileModules: ['gsap', 'gsap/CSSRulePlugin'],

  async exportPathMap(defaultPathMap) {
    const [postList, projectList, pageList] = await Promise.all([
      fetch("https://cms.clarkeverdel.nl/wp-json/wp/v2/posts").then(res => res.json()),
      fetch("https://cms.clarkeverdel.nl/wp-json/wp/v2/projects").then(res => res.json()),
      fetch("https://cms.clarkeverdel.nl/wp-json/wp/v2/pages").then(res => res.json())
    ]);

    const posts = postList.reduce(
      (pages, post) =>
        Object.assign({}, pages, {
          [`/post/${post.slug}`]: {
            page: '/post',
            query: { slug: post.slug, apiRoute: 'post' }
          }
        }),
      {}
    );

    const projects = projectList.reduce(
      (pages, project) =>
        Object.assign({}, pages, {
          [`/project/${project.slug}`]: {
            page: '/post',
            query: { slug: project.slug, apiRoute: 'projects' }
          }
        }),
      {}
    );

    const pages = pageList.reduce(
      (list, page) =>
        Object.assign({}, list, {
          [`/${page.slug}`]: {
            page: (page.slug == 'contact' ? '/contact' : '/post'),
            query: { slug: page.slug, apiRoute: 'page' }
          }
        }),
      {}
    );

    return Object.assign({}, posts, pages, projects, {
      '/post': {
        page: '/post'
      },
      '/project': {
        page: '/post'
      },
      '/': {
        page: '/index'
      }
    })
  },
  webpack: (config, options) => {
    config.module.rules.push(
      // {
      //   test: [/\.js$/, /\.jsx$/],
      //   exclude: ['/node_modules/', '/.next/', '/out/'],
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   options: {
      //     emitWarning: true,
      //   },
      // },
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [{
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false
              }
            },
            ref: true
          }
        }]
      },
    );
    return config
  }

}));
