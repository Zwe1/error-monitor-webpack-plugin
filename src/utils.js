const { request } = require("http");
const qs = require("querystring");
const fs = require("fs");
const p = require("path");
const sourceMapFileIncludes = [/\.map$/, /asset-manifest\.json/];

module.exports = {
  // 上传单个文件
  uploadSourceMaps: options => {
    const { url, sourceMapFile } = options;
    if (!url || !sourceMapFile)
      throw new Error("params 'url' and 'sourceMapFile' is required!!");

    const [host, o] = url.split(":");
    const i = o.indexOf("/");
    const port = o.slice(0, i);
    const path = o.slice(i);

    const req = request({
      host,
      path,
      port,
      method: "POST",
      headers: {
        "Content-Type": "application/octet-strean",
        Connection: "keep-alive",
        "Transfer-Encoding": "chunked"
      }
    });

    fs.createReadStream(sourceMapFile)
      .on("data", chunk => {
        req.write(chunk);
      })
      .on("end", () => {
        req.end();
      });
  },
  /**
   * 递归读取文件夹
   * 输出source-map文件目录
   */
  readDir: path => {
    const filesContent = [];

    function readSingleFile(path) {
      const files = fs.readdirSync(path);
      files.forEach(filePath => {
        const wholeFilePath = p.resolve(path, filePath);
        const fileStat = fs.statSync(wholeFilePath);
        // 查看文件是目录还是单文件
        if (fileStat.isDirectory()) {
          readSingleFile(wholeFilePath);
        }

        // 只筛选出manifest和map文件
        if (
          fileStat.isFile() &&
          sourceMapFileIncludes.some(r => r.test(filePath))
        ) {
          filesContent.push(wholeFilePath);
        }
      });
    }

    readSingleFile(path);

    return filesContent;
  }
};
