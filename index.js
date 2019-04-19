const http = require('http')
var mongoose = require('mongoose');
var mongo = require('mongodb');
var express = require('express')
var cors = require('cors')
var port = process.env.port || 8081;
var app = express();
var bodyParser = require ('body-parser');
var appRoutes = require('./routes/appRouters');

mongoose.connect('mongodb://localhost:27017/meanDb');
connection =mongoose.connection;

connection.on('error',(err)=>{
    console.log(`connect to MongoDB error: ${err.message}`)
})

connection.once('open',()=>{
    console.log('connect to MongoDB')
})


app.use('/',require('./routes/appRouters'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
http.createServer(app).listen(port);

console.log ("backend run in port:", port)
