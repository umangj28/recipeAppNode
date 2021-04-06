var jwt = require('jsonwebtoken');
var common = require('../../config/common');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var fs = require("fs");

var ejs = require('ejs');
const sql = require("../../config/db.js");
const md5 = require('md5');

var express = require('express');
const { fstat } = require('fs');
const { exit } = require('process');
const { res } = require('../../config/general');
var app = express();
var publicDir = require('path').join(__dirname, '/images/');
app.use(express.static(publicDir));

var removeImages = (data, callback) => {
  var nameArr = data.split(',');
  for (let i of nameArr) {
    console.log(i)
    fs.unlink(i, function (err) {
      console.log(err);
    });
  }
  return callback(true);
}





//==============================================================================================================================

//INSERT Register

module.exports.addRegister = (userAdd, result) => {
  sql.query("INSERT INTO register SET ?", userAdd, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return result({ 'error': err , 'message' : err.sqlMessage});
    }
    if (res) {
      console.log(res);
      return result({ 'status': "success", 'status_code' : 200 , 'message': "Register data successfully" });
    }
    else{
      return result({ 'status': "fali", 'status_code' : 404 , 'message': "Error in inserting" }); 
    }
  });
};



//VIEW ALL Register 
module.exports.ViewAllRegister = (result) => {
  sql.query(`SELECT * FROM register `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return result({ 'error': data , 'message' : err.sqlMessage});
    }

    if (res.length) {
      console.log("found customer: ", res);
      return result({ 'status': "success", 'status_code' : 200 , 'data': res });
    }
    else{
      return result({ 'status': "fali", 'status_code' : 404 , 'message': "Error in showingdata" }); 
    }
    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


//   module.exports = Customer;