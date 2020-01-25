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
