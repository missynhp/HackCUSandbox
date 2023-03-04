CREATE DATABASE IF NOT EXISTS stuffnshit;
USE stuffnshit;


CREATE TABLE IF NOT EXISTS User
(
  userID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  alcoholFree BOOLEAN DEFAULT false,
  dairyFree BOOLEAN DEFAULT false,
  fishFree BOOLEAN DEFAULT false,
  glutenFree BOOLEAN DEFAULT false,
  kosher BOOLEAN DEFAULT false,
  peanutFree BOOLEAN DEFAULT false,
  soyFree BOOLEAN DEFAULT false,
  treeNutFree BOOLEAN DEFAULT false,
  vegan BOOLEAN DEFAULT false,
  vegetarian BOOLEAN DEFAULT false
);


CREATE TABLE IF NOT EXISTS SavedRecipe
(
  recipeID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  recipeName VARCHAR(255) NOT NULL,
  recipeIngredients JSON NOT NULL
);


CREATE TABLE IF NOT EXISTS User_SavedRecipe
(
  userID INT NOT NULL PRIMARY KEY,
  recipeID INT NOT NULL PRIMARY KEY,
  CONSTRAINT FK_User_User_SavedRecipe
    FOREIGN KEY (userID)
    REFERENCES User(userID),
  CONSTRAINT FK_SavedRecipe_User_SavedRecipe
    FOREIGN KEY (recipeID)
    REFERENCES Recipe(recipeID)
);


CREATE TABLE IF NOT EXISTS ShoppingList
(
  listID INT PRIMARY KEY AUTO_INCREMENT,
  listName VARCHAR(255) FOREIGN KEY NOT NULL,
  recipeNames JSON NOT NULL,
  recipeIngredients JSON NOT NULL,
  userID INT NOT NULL,
  CONSTRAINT FK_User_ShoppingList
    FOREIGNKEY (userID) REFERENCES User(userID)
);