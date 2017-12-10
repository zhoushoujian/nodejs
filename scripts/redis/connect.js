var redis = require('redis');
var config = { "host": "127.0.0.1", "port": "6379" };
var redisClient = redis.createClient(config);
redisClient.on("connect", function() {
  console.log("connected");
  redisClient.quit();
});
