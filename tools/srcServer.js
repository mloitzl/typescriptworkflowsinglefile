var express = require('express');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.dev.js');
var path = require('path');

const port = 3000;
const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  //hot: true,
  //filename: 'bundle.js',
  //publicPath: '/dist/',
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  //stats: {
  //  colors: true,
  //},
  // historyApiFallback: true,
}));

app.use(webpackHotMiddleware(compiler
//, {
//  log: console.log,
//  path: '/__webpack_hmr',
//  heartbeat: 10 * 1000,
//}
));

app.get('*', function (req, res) {
  // res.send('<body>Hello World<script src=\'dist/bundle.js\'></script></body>');
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
