// next.config.js
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');

module.exports = withCSS(withTM({
    transpileModules: ["lodash-es"]
}));