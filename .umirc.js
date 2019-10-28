
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  cssLoaderOptions:{
    localIdentName:'[local]'
  },
  theme: {
    "primary-color": "#ad2102",
  },
  urlLoaderExcludes: [/.svg$/],
  chainWebpack(config) {
    config.module
      .rule('svg-with-file')
      .test(/.svg$/)
      .use('svg-with-file-loader')
      .loader('file-loader');
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'fh-umi',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
