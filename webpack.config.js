module: {
    loaders: [
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: [
                "style-loader?sourceMap",
                "css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]"
            ]
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }
    ]
}