
var crypto = require('crypto');

// md5
var hash = crypto.createHash('md5');
hash.update('Hello World');
console.log(hash.digest('hex'));

var hash = crypto.createHash('md5');
hash.update('Hello World!');
console.log(hash.digest('hex'));

// sha-1
var hash = crypto.createHash('sha1');
hash.update('Hello World');
console.log(hash.digest('hex')); 


// sha-2

var hash = crypto.createHash('sha256');
hash.update('Hello World');
console.log(hash.digest('hex'));

