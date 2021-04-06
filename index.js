// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const cors = require('cors');
// defining the Express app
const path = require('path')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//set path 
// var user = require('./router/users')
var admin = require('./router/admin/admin.js')
// var book_appoinement = require('./router/book_appoinement')
// var sociallogin = require('./router/sociallogin')
// var deliveryboydata = require('./router/deliveryboydata')
// var assignappointmenttodeliveryboy = require('./router/assignappointmenttodeliveryboy')
// var addtocart = require('./router/addtocart')

//file path 
app.use('/uploads/profile/', express.static('uploads/profile'));
app.use('/uploads/', express.static('uploads'));
app.use(cors());
// app.use('/user', user);
app.use('/admin', admin);
// app.use('/bookapptype', book_appoinement);
// app.use('/sociallogin', sociallogin);
// app.use('/deliveryboydata', deliveryboydata);
// app.use('/addtocart', addtocart);

///testingggg

app.get('/', (req, res) => {
  res.send(ads);
});

app.listen(9005, () => {
  console.log('listening on port 9005');
});