exports.cb = function(next) {
    return function(err, data) {
        if (err) {
            console.log("err: " + err);
            return;
        }
        next(data);
    }
}