module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 3, // 保留小数点
      viewportUnit: "vw",
      selectorBlackList: [".ignore"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
      mediaQuery: false // 允许在媒体查询中转换`px`
    }
  }
};
