var express = require('express');
var session = require('express-session');
var path = require("path");
var fs = require('fs');

var cb = require('./cb').cb;

var app = express();
app.use(session({ secret: "sosososososso" }));

app.get('/', function (req, res) {
  if (req.session.page) {
    req.session.page++;
  } else {
    req.session.page = 1;
  }
  fs.readFile(path.resolve(__dirname, './1.txt'), cb(function (data) {
    var json = String(data);
    json.page = req.session.page;
    res.json(json);
  }));
});

// app.get('/2', function (req, res) {
//   if (req.session.page) {
//     req.session.page++;
//   } else {
//     req.session.page = 1;
//   }
//   fs.readFile(path.resolve(__dirname, './1.txt'), cb(function (data) {
//     var json = String(data);
//     json.page = req.session.page;
//     console.log(json);
//     res.json(json);
//   }));
// });
exports.app = app;
