const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = {
    mode: "development",
    devServer: {
        port: 9090
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "root",
            filename: "bundle.js",
            remotes: {
                header: "header@http://localhost:3001/bundle.js",
                banner: "banner@http://localhost:3002/bundle.js",
                app: "app@http://localhost:3003/bundle.js"
            },
            shared: [
                {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}