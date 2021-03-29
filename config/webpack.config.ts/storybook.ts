import { client as loaders } from './loaders';

export default (storybookBaseConfig: any) => {
    storybookBaseConfig.plugins = [...storybookBaseConfig.plugins];
    storybookBaseConfig.module.rules = [...storybookBaseConfig.module.rules, ...loaders];

    storybookBaseConfig.resolve.extensions = storybookBaseConfig.resolve.extensions.concat([
        '.ts',
        '.tsx',
    ]);

    storybookBaseConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/,
    });

    return storybookBaseConfig;
};
