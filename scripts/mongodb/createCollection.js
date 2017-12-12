var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log(err, db);
  var dbase = db.db("mydb"); //here
  dbase.createCollection("user", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
