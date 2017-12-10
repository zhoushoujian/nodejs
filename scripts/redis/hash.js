var redis = require('redis');
var config = { "host": "127.0.0.1", "port": "6379" };
var redisClient = redis.createClient(config);
redisClient.on("connect", function() {
  console.log("connected");
  var options = {
    subk1: "v1", 
    subk2: "v2",
    subk3: "v3"
  };

  redisClient.hmset("key", options, function() {
    redisClient.hmset("key1", "subk1", "v1", "subk2", "v2", "subk3", "v3");
    redisClient.hgetall("key", function(err, reply) {
      console.log("inside 1");
      console.log(reply);
      redisClient.hgetall("key1", function(err, reply) {
        console.log("inside 2");
        console.log(reply);
        redisClient.quit();
      });
    });
  });
  
});
