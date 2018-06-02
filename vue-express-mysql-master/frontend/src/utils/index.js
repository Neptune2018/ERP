const crypto = require('crypto');

exports.MD5 = function(str) {
	password_salt = "GFAKHJSCBMNXZBVYREIWURIQ";
	const hash = crypto.createHash('md5');
	hash.update(str + password_salt);
	return hash.digest('hex');
}

exports.aesEncrypt = function(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}