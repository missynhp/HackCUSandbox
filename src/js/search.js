var ingredients = [];
function addIngredient(ingredient) {
  console.log("memes");
  ingredients.push(ingredient);
  var textbox = document.getElementById("ingredient");
  textbox.innerHTML = '';
  console.log(ingredients);
}

$('#searchButton').on("click", function () {
	
  var ingredients= $("#ingredient").val(); 
  
  if(ingredients.length>0){
    
    var noCommaIngredients = ingredients.replace(/,/g, '');
    var splitIngredients = noCommaIngredients.split(' ');

    var queryInsertString="";
    
    for (var i = 0; i < words.length; i++) {
      queryInsertString= splitIngredients[i] ;
    }

    // Join the array back into a string using the join() method
    var modifiedString = words.join(' ');

    // Output the modified string to the console
    console.log(modifiedString);
    
  }

    
  
    $.ajax({
      url: "process.php", // URL of the server-side script
      type: "POST",
      data: { sentence: sentence }, // Send the sentence to the server-side script
      success: function(response) {
        alert("Words inserted into database");
      }
    });
  
});
