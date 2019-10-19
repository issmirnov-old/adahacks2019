// server.js
// where your node app starts

// init project
const express = require("express");
var helmet = require('helmet')

var PouchDB = require("pouchdb-node");

const app = express();

// create pouchdb database in .data
var TempPouchDB = PouchDB.defaults({prefix: '.data'})


app.use(helmet()) // secure http headers.
app.use('/db', require('express-pouchdb')(TempPouchDB));

var db = new PouchDB("todoss");
var remoteCouch = 'https://panoramic-chronometer.glitch.me/db';

// tell express web server where our files live
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
// register express routes. you can add more pages here using different routes "/demo", etc.
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html"); // send our main html page
});

// listen for requests - this is what sends the file.
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
