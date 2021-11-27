module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-backgrounds',
    '@storybook/addon-docs',
    '@storybook/preset-scss'
  ],
  core: {
    builder: "webpack5"
  }
};
