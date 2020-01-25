const { uploadSourceMaps, readDir } = require("./utils");
// const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

function errorMonitorWebpackPlugin(options = {}) {
  this.options = options;
}

errorMonitorWebpackPlugin.prototype = {
  apply(compiler) {
    const { url, outputPath } = this.options;
    /**
     * compiler hook: assetEmitted
     * 在文件生成的时候执行
     * 可以获取到访问文件信息的入口
     * https://webpack.js.org/api/compiler-hooks/#assetemitted
     */
    if (url && outputPath) {
      compiler.hooks.done.tap("upload-sourcemap-plugin", status => {
        // uploadSourceMaps({ url });
        const timeStamp = new Date().getTime();
        const sourceMapPaths = readDir(outputPath);
        sourceMapPaths.forEach(p =>
          uploadSourceMaps({
            url: `${url}?timeStamp=${timeStamp}&fileName=${p.replace(
              outputPath,
              ""
            )}`,
            sourceMapFile: p,
            timeStamp
          })
        );
      });
    }
  }
};

module.exports = errorMonitorWebpackPlugin;
