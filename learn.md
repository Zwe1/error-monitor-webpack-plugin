## 学习到的

1. dirname 与 ./

dirname 指向执行文件的绝对路径

./ 指向 node 进程的运行路径

2. path.resolve 与 path.join

join 在英文中有 “连接” 的意思，所以其作用也是连接路径片段, 每一个片段都相对之前解析的结果。

```js
const path = require("path");

let myPath = path.join(__dirname, "/img/so");
let myPath2 = path.join(__dirname, "./img/so");
let myPath3 = path.join(__dirname, "/foo", "bar", "baz/asdf", "quux", "..");

console.log(__dirname); // ~
console.log(myPath); // ~/img/so
console.log(myPath2); // ~/img/so
console.log(myPath3); // ~/foo/bar/baz/asdf
```

resolve 有 “解析” 的意思, 所以作用是访问目录，和 cd 的效果类似, ‘/’ 被解析为根目录

```js
const path = require("path");

let myPath = path.resolve(__dirname, "/img/so");
let myPath2 = path.resolve(__dirname, "./img/so");
let myPath3 = path.resolve("/foo/bar", "./baz");
let myPath4 = path.resolve("/foo/bar", "/tmp/file/");

console.log("1", __dirname); // dirname
console.log("2", myPath); // /img/so
console.log("3", myPath2); // dirname/img/so
console.log("4", myPath3); // /foo/bar/baz
console.log("5", myPath4); // /tmp/file
```
