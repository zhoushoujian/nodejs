var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = { name: "Company Inc", address: "Highway 37" };
  var dbase = db.db("mydb"); 
  dbase.collection("user").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log(res);
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
