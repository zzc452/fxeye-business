module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          //resources: "/assets/css/skin.scss",

          // Or array of paths
          resources: ["./src/assets/css/skin.scss"]
        })
        .end()
    })
  },
  publicPath: '',
  outputDir: '../cordova/www',
  assetsDir: '',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]

}