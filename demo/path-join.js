const path = require("path");
let myPath = path.join(__dirname, "/img/so");
let myPath2 = path.join(__dirname, "./img/so");
let myPath3 = path.join("/foo", "bar", "baz/asdf", "quux", "..");

console.log(__dirname); // ~
console.log(myPath); // ~/img/so
console.log(myPath2); // ~/img/so
console.log(myPath3); // /foo/bar/baz/asdf
