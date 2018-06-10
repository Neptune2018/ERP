const crypto = require('crypto');

exports.makePassword = function(str) {
	password_salt = "REWUIQYDBFAFJHASFGJSAKDF";
    const hmac = crypto.createHmac('sha256', password_salt);
    str = str +'';
	hmac.update(str);
	return hmac.digest('hex');
}


exports.aesDecrypt = function(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}