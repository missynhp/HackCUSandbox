// server.js
// where your node app starts

// init project
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
var fs = require("fs");
var dbFile = "./.data/sqlite.db";
var exists = fs.existsSync(dbFile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFile);
db.open;

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function() {
  //if (!exists) {
    console.log("Table Creation");
    db.run('CREATE TABLE IF NOT EXISTS User(userID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, alcoholFree BOOLEAN DEFAULT false, dairyFree BOOLEAN DEFAULT false, fishFree BOOLEAN DEFAULT false, glutenFree BOOLEAN DEFAULT false, kosher BOOLEAN DEFAULT false, peanutFree BOOLEAN DEFAULT false, soyFree BOOLEAN DEFAULT false, treeNutFree BOOLEAN DEFAULT false, vegan BOOLEAN DEFAULT false, vegetarian BOOLEAN DEFAULT false)');
    db.run('CREATE TABLE IF NOT EXISTS SavedRecipe(recipeID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, recipeName TEXT NOT NULL, recipeIngredients JSON NOT NULL);');
    db.run('CREATE TABLE IF NOT EXISTS User_SavedRecipe(userID INTEGER NOT NULL, recipeID INTEGER NOT NULL, CONSTRAINT FK_User_User_SavedRecipe FOREIGN KEY (userID) REFERENCES User(userID), CONSTRAINT FK_SavedRecipe_User_SavedRecipe FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID));');
    
    db.serialize(function() {
      console.log("Table Insert");
      db.run(
        'INSERT INTO User (username, password) VALUES ("Admin", "Admin");'
      );
    });
  //} else {
    //console.log('Database already exists!');
    //db.run("DROP TABLE IF EXISTS User");
    //db.each("SELECT * from User", function(err, row) {
      //if (row) {
        //console.log("record:", row);
      //}
    //});
  //}
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/src/pages/login.html");
});

app.get("/login", function(request, response) {
  response.sendFile(__dirname + "/src/pages/login.html");
});

app.post("/login", function(request, response) {
  const username = request.body.username;
  const password = request.body.password;
  const query = 'SELECT * FROM User WHERE User.username = ' + username + ';'
  
  db.all(query, function(err, user) {
    if (user == undefined) {
      console.log("User Not Found");
      console.log(user);
      console.log(err);
      response.sendFile(__dirname + "/src/pages/login.html");
      
      console.log(db.run('SELECT * FROM User'));
      
      
    } else if (user.password == password) {
      console.log("Login Successful!");
      response.sendFile(__dirname + "/src/pages/home.html");
      
    } else {
      console.log("Incorrect Password");
      response.sendFile(__dirname + "/src/pages/login.html");
    }
  });
});


app.get("/register", function(request, response) {
  response.sendFile(__dirname + "/src/pages/register.html");
  //response.sendFile("/src/pages/register");
  // db.all("SELECT * from User", function(err, rows) {
  //   response.send(JSON.stringify(rows));
  // });
});

app.post("/register", function(request, response) {
  const username = request.body.username;
  const password1 = request.body.password1;
  const password2 = request.body.password2;
  const query = 'INSERT INTO User (username, password) VALUES (' + username + ', ' + password1 + ');'
  
  if (password1 == password2) {
    db.all(query, function(err, user) {
      console.log("New User Registered!");
      response.sendFile(__dirname + "/src/pages/login.html");
    });
    
  } else {
    console.log("Passwords Don't Match");
    response.sendFile(__dirname + "/src/pages/register.html");
  }
});


app.get("/home", function(request, response) {
  response.sendFile(__dirname + "/src/pages/home.html");
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});


//Pull from DB for the saved recipe 
app.get('/saved-recipe', function(req, res) {

	var lists = 'SELECT recipeName, recipeIngredients FROM SavedRecipe;'

});


app.get('/saved-list', function(req, res) {

	var lists = 'SELECT listName, recipeNames, recipeIngredients FROM ShoppingList;'
  
  
});