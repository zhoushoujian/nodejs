var fs = require("fs");

function readFile(file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, function (err, data) {
            if (err) {
                reject(err)
                return;
            }
            resolve(data);
        });
    }).catch((e) => {
      console.log(e);
    });
}

readFile('1.txt').then(function(data) {
    console.log(String(data));
})
