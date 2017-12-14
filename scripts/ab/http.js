const http = require('http');
const fs = require('fs');
const redis = require('redis');
const redisClient = redis.createClient();
const server = http.createServer((req, res) => {
  redisClient.get('hello', function(err, reply) {
    if (reply) {
      res.end(String(reply));
      return ;
    }
  fs.readFile('1.txt', function(err, data) {
    if (err) {
      throw err;
    }
    redisClient.set('hello', String(data), 'EX', 10);
    res.end(String(data));
  });
  });
});
let port = process.env.NODE_PORT || 8080;
server.listen(port, () => {
  console.log("Server started at: " + port);
});

