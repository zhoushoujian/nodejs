var timer = setImmediate(function(a, b, c) {
    console.log(a, b, c);
}, 1000, 1, 'a');
console.log("hello");
