var settings = require('node-weixin-settings');
var request = require('request');
var auth = require('node-weixin-auth');
var app = {
  id: process.env.APP_ID || 'wx407aa0cf5996fed4',
  secret: process.env.APP_SECRET || '0e7653802c2277681494f8cc6e2631eb',
  token: process.env.APP_TOKEN || 'AAAA'
};

async function getToken() {
  return await new Promise(function(resolve, reject) {
    auth.tokenize(settings, app, function(err, json) {
      if (err) {
        return reject(err);
      }
      resolve(json);
    });
  });
}

async function getMenu() {
  let url = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?';
  let token = await getToken();
  console.log(token);
  await new Promise(function(reqsolve, reject) {
    request(url + 'access_token=' + token.access_token, function(err, res, body) {
      console.log(err, body);
    });
  });
}

getMenu();
