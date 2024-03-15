const autoprefixer = require("autoprefixer");
const path = require("path");

const CSSModuleLoader = { // for *.module.css files
  loader: "css-loader",
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: "[local]__[hash:base64:5]"
  }
};

const CSSLoader = {
  loader: "css-loader", // for plain *.css files
  options: {
    modules: false,
    sourceMap: true
  }
};

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    sourceMap: true,
    plugins: () => [
      require("cssnano")(),
      autoprefixer({
        browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]
      })
    ]
  }
};

module.exports = {
  mode: "production",
  entry: __dirname + "/client/index.jsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/client/public"
  },

  devtool: "source-map",

  resolve: {
    alias: {
      Client: path.resolve(__dirname, "client/"),
      Common: path.resolve(__dirname, "client/common/"),
      Components: path.resolve(__dirname, "client/components/")
    },

    modules: [
      path.resolve(__dirname, "node_modules")
    ],
    extensions: ["*", ".js", ".jsx", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
              plugins: ["transform-strict-mode"]
            }
          }
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          "style-loader",
          CSSLoader,
          postCSSLoader
        ]
      },
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          CSSModuleLoader,
          postCSSLoader
        ]
      }
    ]
  },

  externals: [{
    "config": JSON.stringify(require("./client/config/config.prod.json")),
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM"    
  }],
  
  watch: false
};