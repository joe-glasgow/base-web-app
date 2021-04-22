import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

// @ts-ignore
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';

const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true;

const cssRegex = /\.((c|sa|sc)ss)$/i;
const cssModuleRegex = /\.module\.((c|sa|sc)ss)$/;
const sassRegex = /\.(sass|scss)$/;

const isDevelopment = process.env.NODE_ENV !== 'production';
// temporary wrapper function around getCSSModuleLocalIdent until this issue is resolved:
// https://github.com/webpack-contrib/css-loader/pull/965
const getLocalIdentWorkaround = (
    context: any,
    localIdentName: any,
    localName: any,
    options: any
) => {
    if (options && options.context === null) {
        options.context = undefined;
    }
    return getCSSModuleLocalIdent(context, localIdentName, localName, options);
};

const babelLoader = {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: {
        plugins: [
            [
                require.resolve('babel-plugin-named-asset-import'),
                {
                    loaderMap: {
                        svg: {
                            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                        },
                    },
                },
                isDevelopment ? require.resolve('react-refresh/babel') : undefined,
            ],
        ],
        cacheDirectory: true,
        cacheCompression: process.env.NODE_ENV === 'production',
        compact: process.env.NODE_ENV === 'production',
    },
};

const sassLoader = {
    test: sassRegex,
    use: [
        { loader: MiniCssExtractPlugin.loader },
        { loader: 'css-modules-simple-types-loader' },
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    mode: 'local',
                    exportLocalsConvention: 'camelCase',
                },
                import: false,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
            },
        },
    ],
};

const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    use: [
        {
            loader: 'url-loader',
        },
    ],
};

const cssModuleLoaderClient = {
    test: cssModuleRegex,
    use: [
        require.resolve('css-hot-loader'),
        MiniCssExtractPlugin.loader,
        {
            loader: require.resolve('css-loader'),
            options: {
                modules: {
                    exportLocalsConvention: 'camelCase',
                    // getLocalIdent: getCSSModuleLocalIdent,
                    getLocalIdent: getLocalIdentWorkaround,
                },
                importLoaders: 1,
                sourceMap: generateSourceMap,
                // localIdentName: '[name]__[local]--[hash:base64:5]',
                // getLocalIdent: getCSSModuleLocalIdent,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
    ],
};

const cssLoaderClient = {
    test: cssRegex,
    exclude: cssModuleRegex,
    use: [
        require.resolve('css-hot-loader'),
        MiniCssExtractPlugin.loader,
        require.resolve('css-loader'),
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
    ],
};

const cssModuleLoaderServer = {
    test: cssModuleRegex,
    use: [
        {
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 1,
                modules: {
                    exportOnlyLocals: true,
                    exportLocalsConvention: 'camelCase',
                    // getLocalIdent: getCSSModuleLocalIdent,
                    getLocalIdent: getLocalIdentWorkaround,
                },
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
    ],
};

const cssLoaderServer = {
    test: cssRegex,
    exclude: cssModuleRegex,
    use: [{ loader: MiniCssExtractPlugin.loader }, { loader: require.resolve('css-loader') }],
};

const urlLoaderClient = {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: require.resolve('url-loader'),
    options: {
        limit: 2048,
        name: 'assets/[name].[hash:8].[ext]',
    },
};

const urlLoaderServer = {
    ...urlLoaderClient,
    options: {
        ...urlLoaderClient.options,
        emitFile: false,
    },
};

const fileLoaderClient = {
    exclude: [/\.(js|jsx|ts|tsx|css|mjs|html|ejs|json)$/],
    use: [
        {
            loader: require.resolve('file-loader'),
            options: {
                name: 'assets/[name].[hash:8].[ext]',
            },
        },
    ],
};

const fileLoaderServer = {
    exclude: [/\.(js|tsx|ts|tsx|css|mjs|html|ejs|json)$/],
    use: [
        {
            loader: require.resolve('file-loader'),
            options: {
                name: 'assets/[name].[hash:8].[ext]',
                emitFile: false,
            },
        },
    ],
};

export const client = [
    {
        oneOf: [
            fontLoader,
            babelLoader,
            sassLoader,
            cssModuleLoaderClient,
            cssLoaderClient,
            urlLoaderClient,
            fileLoaderClient,
        ],
    },
];

export const server = [
    {
        oneOf: [
            fontLoader,
            babelLoader,
            sassLoader,
            cssModuleLoaderServer,
            cssLoaderServer,
            urlLoaderServer,
            fileLoaderServer,
        ],
    },
];

export default { client, server };
