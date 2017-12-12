var crypto = require('crypto');
var algorithm = 'aes192';

function EncOrDec(algorithm, password) {
    this.algorithm = algorithm;
}
EncOrDec.prototype.enc = function (text, password) {
    let cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    return cipher.final('hex');
}

EncOrDec.prototype.dec = function (text, password) {
    let decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    return decipher.final('utf8');
}
var eord = new EncOrDec(algorithm);
enc = eord.enc('Hello', 'ososs');
dec = eord.dec(enc, 'ososs');
console.log(enc);
console.log(dec);