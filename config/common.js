var jwt = require('jsonwebtoken');
var db = require('../config/db').db3;
var _conf = require('../config/general');


module.exports.generateToken = (data, callback) => {
    data = data == undefined ? '' : data;
    jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * _conf.token_expiresIn.expiresIn),
        data: data
    }, _conf.secretKey, function (err, token) {
        // console.log(token);
        if (err) return callback(err, token);
        else return callback(err, token);
    });
}

module.exports.checkToken = (req, res, next) => {
    var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, _conf.secretKey, (err, decoded) => {
            if (err) {
                return res.json({
                    "statuscode": "203",
                    "status": 'false',
                    "msg": 'Token is not valid',
                    "error": err
                });
            } else {
                jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * _conf.token_expiresIn.expiresIn),
                    data: decoded.data
                }, _conf.secretKey, function (err, token) {
                    req.decoded = decoded;
                    next(decoded.data, token);
                    // if (err) return callback(err, token);
                    // else return callback(err, token);
                });

            }
        });
    } else {
        return res.json({
            "statuscode": "203",
            "status": fasle,
            "msg": 'Auth token is not supplied'
        });
    }
};

module.exports.validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}