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

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function() {
  if (!exists) {
    console.log("Table Creation");
    db.run("CREATE TABLE IF NOT EXISTS User(userID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, firstName TEXT, lastName TEXT, alcoholFree BOOLEAN DEFAULT false, dairyFree BOOLEAN DEFAULT false, fishFree BOOLEAN DEFAULT false, glutenFree BOOLEAN DEFAULT false, kosher BOOLEAN DEFAULT false, peanutFree BOOLEAN DEFAULT false, soyFree BOOLEAN DEFAULT false, treeNutFree BOOLEAN DEFAULT false, vegan BOOLEAN DEFAULT false, vegetarian BOOLEAN DEFAULT false)");
    db.run("CREATE TABLE IF NOT EXISTS SavedRecipe(recipeID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, recipeName TEXT NOT NULL, recipeIngredients JSON NOT NULL)");
    db.run("CREATE TABLE IF NOT EXISTS User_SavedRecipe(userID INT NOT NULL PRIMARY KEY, recipeID INT NOT NULL PRIMARY KEY, CONSTRAINT FK_User_User_SavedRecipe FOREIGN KEY (userID) REFERENCES User(userID), CONSTRAINT FK_SavedRecipe_User_SavedRecipe FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID))");
    
    // insert default dreams
    db.serialize(function() {
      console.log("Table Insert");
      db.run(
        'INSERT INTO User (username, password) VALUES ("Admin", "Admin")'
      );
    });
  } else {
    console.log('Database already exists!');
    //db.run("DROP TABLE IF EXISTS User");
    db.each("SELECT * from User", function(err, row) {
      if (row) {
        console.log("record:", row);
      }
    });
  }
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/src/pages/login.html");
});

app.get("/login", function(request, response) {
  response.sendFile(__dirname + "/src/pages/login.html");
});

app.post("/login", function(request, response) {
  console.log("Button!");
});


// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get("/register", function(request, response) {
  response.sendFile(__dirname + "/src/pages/register.html");
  db.all("SELECT * from User", function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});


//Pull from DB for the saved recipe 
app.get('/saved-recipe', function(req, res) {

	var lists = 'SELECT recipeName, recipeIngredients FROM SavedRecipe;'

    // db.task('get-everything', task => {
    //     return task.batch([
    //         task.any(lists)
    //     ]);
    // })
    //     .then(info => {
    //         res.render('pages/saved-recipe',{
    //             my_title: "Search Stash Page",
    //             movies: info[0]
    //         })
    //     })
    //     .catch(error => {
    //         console.log('error', error);
    //         res.render('pages/saved-recipe', {
    //             my_title: "Search Stash Page",
    //             movies:''
    //         })
    //     });
});


app.get('/saved-list', function(req, res) {

	var lists = 'SELECT listName, recipeNames, recipeIngredients FROM ShoppingList;'
  
    // db.task('get-everything', task => {
    //     return task.batch([
    //         task.any(lists)
    //     ]);
    // })
    //     .then(info => {
    //         res.render('pages/saved-recipe',{
    //             my_title: "Search Stash Page",
    //             movies: info[0]
    //         })
    //     })
    //     .catch(error => {
    //         console.log('error', error);
    //         res.render('pages/saved-recipe', {
    //             my_title: "Search Stash Page",
    //             movies:''
    //         })
    //     });
});