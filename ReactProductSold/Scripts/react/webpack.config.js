module.exports = {
    mode: "development",
    context: __dirname,
    entry: {
        index: "./index.js",
        customer: "./customer.js",
        product: "./Product.js",
        productsold:"./ProductSold.js",
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name]_bundle.js"
       // filename: "entry_bundle.js"
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        "plugins": [
                            [
                                "@babel/plugin-proposal-class-properties"
                            ]
                        ]
                       
                    }
                }
            }, {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
             }   

        ]
    }
}