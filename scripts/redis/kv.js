var redis = require('redis');
var config = { "host": "127.0.0.1", "port": "6379" };
var redisClient = redis.createClient(config);
redisClient.on("connect", function() {
  console.log("connected");
  redisClient.set("key1", "value1");
  redisClient.set(["key2", "value2"]);
  redisClient.set(["key3", "value3"], function() {
    console.log("inside end");
    console.log(arguments);
    redisClient.get("key3", function(err, reply) {
      console.log(reply);
      redisClient.quit();
    });

  });
});
