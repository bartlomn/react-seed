var getConfig = require('hjs-webpack');

module.exports = getConfig({
    port: 9090,
    hostname: '0.0.0.0',
    in: 'src/app.js',
    out: 'public',
    clearBeforeBuild: true
});
