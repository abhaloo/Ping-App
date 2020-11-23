var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');
const cors = require("cors");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//connect to Pusher
var pusher = new Pusher({ 
    appId: process.env.APP_ID, 
    key: process.env.APP_KEY, 
    secret:  process.env.APP_SECRET,
    cluster: process.env.APP_CLUSTER, 
  });

//route to verify if server is working
app.get('/', function(req, res){ 
    res.send('Server is running...');
  });

//authenicate users  
app.post('/pusher/auth', function(req, res) {

    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var auth = pusher.authenticate(socketId, channel);  
    var app_key = req.body.app_key;
    if(app_key == process.env.UNIQUE_KEY){
      var auth = pusher.authenticate(socketId, channel);
      res.send(auth);
    }

    res.send(auth);
  });
  

//initiate server port  
var port = process.env.PORT || 5000;
app.listen(port);