import path from 'path';
import webpack from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HTMLInlineCSSWebpackPlugin from 'html-inline-css-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import paths from '../paths';
import { clientOnly } from '../../scripts/utils';
// const env = require('../env')();
import envBuilder from '../env';

const env = envBuilder();
const isDevelopment = process.env.NODE_ENV !== 'production';
const analyze = process.env.ANALYZE;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const isProfilerEnabled = () => process.argv.includes('--profile');

export const shared = [
    new MiniCssExtractPlugin({
        filename:
            process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[contenthash].css',
        chunkFilename:
            process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[contenthash].css',
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
];

if (isDevelopment) {
    // only enable hot in development
    shared.push(new webpack.HotModuleReplacementPlugin());
}

const clientBase = [
    new LoadablePlugin(),
    clientOnly() &&
        new HtmlWebpackPlugin({
            filename: path.join(paths.clientBuild, 'index.html'),
            inject: true,
            template: paths.appHtml,
        }),
    // new webpack.ProgressPlugin(), // make this optional e.g. via `--progress` flag
    new webpack.DefinePlugin(env.stringified),
    new webpack.DefinePlugin({
        __SERVER__: 'false',
        __BROWSER__: 'true',
    }),
    new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
    isProfilerEnabled() && new webpack.debug.ProfilingPlugin(),
];

export const client = [
    ...clientBase,
    new WebpackManifestPlugin({ fileName: 'manifest.json', writeToFileEmit: true }),
    analyze && new BundleAnalyzerPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    !isDevelopment &&
        new CompressionPlugin({
            filename: '[base].gz',
            algorithm: 'gzip',
            test: /\.(js|css)(\?.*)?$/i,
            minRatio: Number.MAX_SAFE_INTEGER, // Compress everything
            deleteOriginalAssets: false,
        }),
].filter(Boolean);

export const sBClient = [...clientBase].filter(Boolean);

export const server = [
    new webpack.DefinePlugin({
        __SERVER__: 'true',
        __BROWSER__: 'false',
    }),
    // We should make sure to have our locales in shared/i18n/locales ready at build time.
    // They are then copied into the server build folder so they can be accessed via
    // i18next-xhr-backend and our custom /locales/:locale/:namespace endpoint.
    new CopyPlugin({
        patterns: [
            {
                from: paths.robots,
                to: paths.clientBuild,
            },
            {
                from: paths.locales,
                to: path.join(paths.serverBuild, 'locales'),
                globOptions: {
                    ignore: ['*.missing.json'],
                },
            },
        ],
    }),
];

export default {
    shared,
    client,
    sBClient,
    server,
};
