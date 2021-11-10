var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
      
    ]
},
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    static: path.join(__dirname, 'src'),
    compress: true,
    port: 8080
  }
};