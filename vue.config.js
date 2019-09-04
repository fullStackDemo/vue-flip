
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  pages: {
    index: {
      //entry for the page
      entry: './example/main.js',
      //template for the page
      template: './example/index.html',
      //output as dist/index.html
      fileName: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-verdors', 'chunk-common', 'index']
    }
  },
  productionSourceMap: false,
  configureWebpack: config => {

    config.resolve.alias['@'] = resolve('src');
    config.resolve.alias['@c'] = resolve('src/components');
    config.resolve.alias['@data'] = resolve('example/data');
    config.resolve.alias['@less'] = resolve('example/less');


    config.plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }));

    
  }
};