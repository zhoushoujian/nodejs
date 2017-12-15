var server = require('express')();
var settings = require('node-weixin-settings');
var promisify = require('util').promisify;
var auth = require('node-weixin-auth');
var port = 2048;
var app = {
  id: process.env.APP_ID || 'wx407aa0cf5996fed4',
  secret: process.env.APP_SECRET || '0e7653802c2277681494f8cc6e2631eb',
  token: process.env.APP_TOKEN || 'AAAA'
};

console.log(app);

server.get('/token', async function() {
});
server.get('/ack', function (req, res) {
  var data = auth.extract(req.query);
  auth.ack(app.token, data, function (error, echoStr) {
    console.log(echoStr);
    if (!error) {
      res.send(echoStr);
      return;
    }
    switch (error) {
      case 1:
        res.send('Input Error!');
        break;
      case 2:
        res.send('Signature Not Match!');
        break;
      default:
        res.send('Unknown Error!');
        break;
    }
  });
});

server.listen(port, function () {
  console.log('Ack server running on ' + port);
  console.log(arguments);
});
