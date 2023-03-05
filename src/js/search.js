// function addIngredient() {
//   console.log("memes");
//   var textbox = document.getElementById("ingredient");
//   ingredients.push(textbox.value);
//   textbox.value = '';
//   console.log(ingredients);
// }

$('#searchButton').on("click", function () {
	
  var ingredients= $("#ingredient").val(); 
  var rating=$(#dropDown).val;
  if(ingredients.length>0){
    
    var noCommaIngredients = ingredients.replace(/,/g, '');
    var noCommaIngredients = noCommaIngredients.replace(/./g, '');
    var splitIngredients = noCommaIngredients.split(' ');
    var queryInsertString="api.edamam.com/api/recipes/v2?type=public&q=";
    
    for (var i = 0; i < splitIngredients.length-1; i++) {
      queryInsertString= queryInsertString+splitIngredients[i]+"%2C%20" ;
    }
    
    queryInsertString=queryInsertString[splitIngredients.length-1]+"&app_id=05dae6b2&app_key=fd4342462e88e2274ddb5850559232f5&imageSize=SMALL&random=true"
    if()
        queryInsertString=queryInsertString+"&co2EmissionsClass="+rating; 
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


