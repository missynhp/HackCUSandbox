// function addIngredient() {
//   console.log("memes");
//   var textbox = document.getElementById("ingredient");
//   ingredients.push(textbox.value);
//   textbox.value = '';
//   console.log(ingredients);
// }

$('#searchButton').on("click", function () {
	
  var ingredients= $("#ingredient").val(); 
  
  if(ingredients.length>0){
    
    var noCommaIngredients = ingredients.replace(/,/g, '');
    var noCommaIngredients = noCommaIngredients.replace(/./g, '');
    var splitIngredients = noCommaIngredients.split(' ');

    var queryInsertString="";
    
    for (var i = 0; i < splitIngredients.length; i++) {
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
