// 1.
(function(a1, a2, a3) {

})('aaa', 'bb', 'cc');

// 2.
var a = (function(cb) {
  console.log("inside cb");
  return cb;
})(function(err) {
  if (err) 
  {
    console.log("Hello World!");
  } else {
    console.log("Hello World! 1");
  }
});
a(1);
a();

// 3.
(function(cb) {
  console.log("inside cb");
  cb(1);
  cb();
})(function(err) {
  if (err) 
  {
    console.log("Hello World!");
  } else {
    console.log("Hello World! 1");
  }
});
