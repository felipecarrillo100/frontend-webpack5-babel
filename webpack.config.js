const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {
    const mode = argv.mode || process.env.NODE_ENV;
    console.log("Mode detected: " + mode);
    if (mode==="production") process.env.NODE_ENV = "production";
    const isDevelopment = mode !== 'production' && mode !== 'test';

    return {
        entry: ['./src/index.tsx'],
        output: {
            filename: 'index.js',
            chunkFilename: '[name].chunk.js',
        },
        devServer: {
            port: 4000,
            open: true,
        },
        module: {
            rules: [
                {
                    // Typescript loader
                    test: /\.tsx?$/,
                    exclude: /(node_modules|\.webpack)/,
                    use: {
                        loader:"babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                            plugins: [
                                isDevelopment && require("react-refresh/babel")
                            ].filter(Boolean),
                        }
                    },
                },
                {
                    // CSS Loader
                    test: /\.css$/,
                    use: [
                        { loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader },
                        { loader: 'css-loader' },
                    ],
                },
                {
                    // SCSS (SASS) Loader
                    test: /\.s[ac]ss$/i,
                    use: [
                        { loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader },
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' },
                    ],
                },
                {
                    // Less loader
                    test: /\.less$/,
                    use: [
                        { loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader },
                        { loader: 'css-loader' },
                        { loader: 'less-loader' },
                    ],
                },
                {
                    // Assets loader
                    // More information here https://webpack.js.org/guides/asset-modules/
                    test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|xml|eot|ttf|woff|woff2)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[hash][ext][query]',
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', ".scss"],
            fallback: {
                fs: false,
                path: require.resolve('path-browserify'),
                buffer: require.resolve('buffer/'),
            },
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            unused: false
                        }
                    }
                })
            ]
        },
        plugins: [
            isDevelopment && new ForkTsCheckerWebpackPlugin(),
            isDevelopment && new ReactRefreshWebpackPlugin(),
            isDevelopment && new ESLintPlugin({
                files: 'src/**/*.{ts,tsx}',
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                inject: true,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash].css',
                chunkFilename: '[name].[chunkhash].chunk.css',
            }),
        ].filter(Boolean)
    }
}
