function a(cb) {
  console.log('inside a');
  cb();
}


a(function() {
  a(function() {
    a(function() {
      a(function() {
        a(function() {
          a(function() {
            a(function() {
              a(function() {
                a(function() {
                  a(function() {
                    a(function() {
                      console.log("Callback end");
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});


var b = new Promise(function(resolve, reject) {
});
b.then(function() {
  console.log("inside 1");
}).then(function() {
  console.log("inside 1");
}).then(function() {
  console.log("inside 1");
}).then(function() {
  console.log("inside 1");
}).then(function() {
  console.log("inside 1");
}).then(function() {
  console.log("inside end");
});

var timed = function(interval = 1000) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(interval)
    }, interval);
  });
}

async function t() {
  let interval = await timed();
  console.log(interval);
  console.log("before await");
  await timed();
  console.log("after await");
}

t();

