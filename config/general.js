var nodemailer = require('nodemailer');
// var FCM = require('fcm-node');

module.exports = {
    weekEnd: 6,
    secretKey: 'secret',
    session_expiry: 30,
    api_authentication: false,
    token_expiresIn: { expiresIn: 3000 }
}
module.exports.res = {
    desc_sep: '|'
}
module.exports.paymentRedirectUrl = {
    // web: 'https://firstchoize.com/#/paymentstatus',
    // phone: 'https://firstchoize.com:8000/payment-success'
}
module.exports.keys = {

}
module.exports.validation = {

}
module.exports.error_msg_on_mandatory = {

}

