var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");
var md5 = require("md5");
const userModel = require('../../model/admin/admin_model.js'); //register page SQL queries 
const { request, response } = require('express');
// router.use(uploadArray);
router.use(express.static('public'));
var common = require('../../config/common.js');


var storage = multer.diskStorage({
    destination: './uploads/profile',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})


const upload = multer({ storage: storage })

//Super -admin login
router.post("/validateSuperAdmin", upload.any(), (req, res) => {
    var data = {};
    console.log(req.body.uname);

    data['email'] = req.body.email;
    data['password'] = md5(req.body.password);
    
     userModel.validateSuperAdmin(data, function(response){
        console.log(response);
        return res.send(response);
    })
});




// --------------------------------------------------------------------------------

//Insert Register
router.post("/addRegister", upload.any(), (req, res) => {
    var data = {};
    console.log(req.body.uname);

    data['name'] = req.body.name;
    data['password'] = md5(req.body.password);
    data['email'] = req.body.email;
    data['dob'] = req.body.dob;
    data['phone'] = req.body.phone;
    data['prefered_language'] = req.body.prefered_language;
    data['city'] = req.body.city;
    data['social_id'] = req.body.social_id;
    data['social_type'] = req.body.social_type;

    // console.log(data);
    userModel.addRegister(data, function(response){
        console.log(response);
        return res.send(response);
    })
});



//VIEW ALL Register List 
router.get("/ViewAllRegister/", (req, res) => {
        // common.checkToken(req,res, (uData,token) =>  {
        userModel.ViewAllRegister(function(response){
            console.log(response);
            return res.send(response);
        }) 
    // });
});


module.exports = router;
