var redis = require("redis");
var pub = redis.createClient();
var sub = redis.createClient();

sub.on("message", function (channel, message) {
  console.log("on message");
  console.log(channel, message);
});

sub.on("subscribe", function() {
  pub.publish("v", "sending a message.");
});
sub.subscribe("v");
pub.publish("v", "directly sending a message.");
setTimeout(function() {
  pub.publish("v", "tick sending a message.");
}, 10);

