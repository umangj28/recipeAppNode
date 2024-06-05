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
var admin = require('./router/admin/admin.js') //connecting sql for register page- passing variables


//file path 
app.use('/uploads/profile/', express.static('uploads/profile'));
app.use('/uploads/', express.static('uploads'));
app.use(cors());//CORS is shorthand for Cross-Origin Resource Sharing
//Middleware – is referred to as middle tier. Essentially Middleware links the front and back end of the system together acting as a bridge between the front and back end.
//Front-end and back-end interact in two ways: 1- A simple blog case: When you type the URL of a specific post, your browser is making a HTTP request to the back-end. The back-end returns a HTTP response containing the HTML code interpreted by the browser.


var corsOptions = {
  origin: "http://localhost:4200" //frontend domain
};

app.use(cors(corsOptions));
// app.use('/user', user);
app.use('/admin', admin); //line 14


const db = require("./model/ind.js");
db.sequelize.sync(); //Synchronous (or sync) execution usually refers to code executing in sequence.

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
///testingggg
const ads = [
  {title: 'Hello, world (again)!'}
];
app.get('/', (req, res) => {
  res.send(ads);
});
 
require("./router/tutorial.routes.js")(app); //routes of recipe pg
app.listen(9005, () => {
  console.log('listening on port 9005');
});