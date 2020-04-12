module.exports = {
    stories: ['../stories/**/*.stories.tsx'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links'],
    webpackFinal: async (config) => {
        // do mutation to the config
        console.log(require('../config/webpack.config.ts/storybook')(config));
        return require('../config/webpack.config.ts/storybook')(config);
    },
};
