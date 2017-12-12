var redis = require('redis');
var config = { "host": "127.0.0.1", "port": "6379" };
var redisClient = redis.createClient(config);
redisClient.on("connect", function() {
  console.log("connected");
  redisClient.set("key", "value", "EX", "1");
  redisClient.get("key", function(err, reply) {
    console.log(reply);
    setTimeout(function() {
      redisClient.get("key", function(err, reply) {
        console.log("inside expired");
        console.log(reply);
        redisClient.quit();
      });
    }, 1 * 1000);
  });
});
