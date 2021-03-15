module.exports = {
    stories: ['../stories/**/*.stories.tsx'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links'],
    webpackFinal: async (config) => {
        // do mutation to the config
        return require('../config/webpack.config.ts/storybook')(config);
    },
};
