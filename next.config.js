const withTM = require('next-transpile-modules')(['gsap']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

require("dotenv").config();

module.exports = withBundleAnalyzer(withTM({
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_URL: process.env.API_URL,
    MAILER_ENDPOINT: process.env.MAILER_ENDPOINT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD
  },

  // async exportPathMap(defaultPathMap) {
  //   const [postList, projectList, pageList] = await Promise.all([
  //     fetch("https://cms.clarkeverdel.nl/wp-json/wp/v2/posts").then(res => res.json()),
  //     fetch("https://cms.clarkeverdel.nl/wp-json/wp/v2/projects").then(res => res.json()),
  //     fetch("https://cms.clarkeverdel.nl/wp-json/wp/v2/pages").then(res => res.json())
  //   ]);

  //   const posts = postList.reduce(
  //     (pages, post) =>
  //       Object.assign({}, pages, {
  //         [`/post/${post.slug}`]: {
  //           page: '/post',
  //           query: { slug: post.slug, apiRoute: 'post' }
  //         }
  //       }),
  //     {}
  //   );

  //   const projects = projectList.reduce(
  //     (pages, project) =>
  //       Object.assign({}, pages, {
  //         [`/project/${project.slug}`]: {
  //           page: '/project',
  //           query: { slug: project.slug, apiRoute: 'project' }
  //         }
  //       }),
  //     {}
  //   );

  //   const pages = pageList.reduce(
  //     (list, page) =>
  //       Object.assign({}, list, {
  //         [`/${page.slug}`]: {
  //           page: (page.slug == 'contact' ? '/contact' : '/post'),
  //           query: { slug: page.slug, apiRoute: 'page' }
  //         }
  //       }),
  //     {}
  //   );

  //   return Object.assign({}, posts, pages, projects, {
  //     '/post': {
  //       page: '/post'
  //     },
  //     '/project': {
  //       page: '/project'
  //     },
  //     '/': {
  //       page: '/index'
  //     }
  //   })
  // },
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
      // {
      //   test: /\.(css|scss)/,
      //   loader: 'emit-file-loader',
      //   options: {
      //     name: 'dist/[path][name].[ext]'
      //   }
      // },
      // {
      //   test: /\.css$/,
      //   use: ['babel-loader', 'raw-loader', 'postcss-loader']
      // },
      // {
      //   test: /\.s(a|c)ss$/,
      //   use: ['babel-loader', 'raw-loader', 'postcss-loader',
      //     {
      //       loader: 'resolve-url-loader'
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         includePaths: ['styles', 'node_modules']
      //           .map((d) => path.join(__dirname, d))
      //           .map((g) => glob.sync(g))
      //           .reduce((a, c) => a.concat(c), []),
      //           sourceMap: true,
      //           sourceMapContents: false
      //       }
      //     }
      //   ]
      // },
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
      {
        test: require.resolve('./src/js/fetchMenuItems.js'),
        use: [{ loader: 'val-loader' }]
      }
    );
    return config
  }

}));
