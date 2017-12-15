var mysql = require('mysql');
var init = function (db) {
  var options = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  };
  if (db) {
    options.database = db;
  }
  var con = mysql.createConnection(options);
  return new Promise(function(resolve, reject) {
    con.connect(function (err) {
      if (err) {
        reject(err);
        return;
      }
      console.log("Connected!");
      resolve(con);
    });
  });
}

if (!module.parent) {
  init();
}
module.exports = init;

