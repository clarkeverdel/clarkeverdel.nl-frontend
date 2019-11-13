const path = require('path')
const glob = require('glob')
const fetch = require('isomorphic-unfetch')

module.exports = {
  async exportPathMap(defaultPathMap) {
    const [postList, projectList, pageList] = await Promise.all([
      fetch("https://cms.clarkeverdel.nl/wp-json/wp/v2/posts").then(res => res.json()),
      fetch("https://cms.clarkeverdel.nl/wp-json/wp/v2/projects").then(res => res.json()),
      fetch("https://cms.clarkeverdel.nl/wp-json/wp/v2/pages").then(res => res.json())
    ])

    const posts = postList.reduce(
      (pages, post) =>
        Object.assign({}, pages, {
          [`/post/${post.slug}`]: {
            page: '/post',
            query: { slug: post.slug }
          }
        }),
      {}
    )

    const projects = projectList.reduce(
      (pages, project) =>
        Object.assign({}, pages, {
          [`/project/${project.slug}`]: {
            page: '/post',
            query: { slug: project.slug }
          }
        }),
      {}
    )

    const pages = pageList.reduce(
      (list, page) =>
        Object.assign({}, list, {
          [`/${page.slug}`]: {
            page: '/post',
            query: { slug: page.slug }
          }
        }),
      {}
    )

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
  webpack: (config, { dev }) => {
    config.module.rules.push(
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
      }
    );
    return config
  }
};