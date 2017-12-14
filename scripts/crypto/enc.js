var crypto = require('crypto');
var algorithm = 'aes192';

function EncOrDec(algorithm, key) {
    this.algorithm = algorithm;
}
EncOrDec.prototype.enc = function (text, key) {
    let cipher = crypto.createCipher(algorithm, key);
    cipher.update(text, 'utf8', 'hex');
    return cipher.final('hex');
}

EncOrDec.prototype.dec = function (text, key) {
    let decipher = crypto.createDecipher(algorithm, key);
    decipher.update(text, 'hex', 'utf8');
    return decipher.final('utf8');
}
var eord = new EncOrDec(algorithm);
enc = eord.enc('Hello', 'ososs');
dec = eord.dec(enc, 'ososs');
console.log(enc);
console.log(dec);
