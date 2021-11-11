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

  eslint: {
    dirs: ['pages', 'src/components', 'src/js'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },

  webpack: (config, options) => {
    config.module.rules.push(
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
