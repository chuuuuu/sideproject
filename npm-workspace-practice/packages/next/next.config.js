// Tell webpack to compile the "bar" package, necessary if you're using the export statement for example
// https://www.npmjs.com/package/next-transpile-modules
const withTM = require("next-transpile-modules")([
  "@nwp/controller",
  "@nwp/common",
]);

module.exports = withTM({
  webpack5: false, // you want to keep using Webpack 4
});
