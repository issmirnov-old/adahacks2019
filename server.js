// server.js
// where your node app starts

// init project
const express = require("express");
var PouchDB = require('pouchdb-node');

const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

var db = new PouchDB('todos');
var remoteCouch = false;
addTodo(db, "testing todo")


// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  //response.sendFile(__dirname + "/views/index.html");
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    //redrawTodosUI(doc.rows);
      response.send(doc.rows);
  });
  

});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});



function addTodo(db, text) {
  var todo = {
    _id: new Date().toISOString(),
    title: text,
    completed: false
  };
  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a todo!');
    }
  });
}