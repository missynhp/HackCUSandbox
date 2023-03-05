var ingredients = [];
function addIngredient(ingredient) {
  console.log("memes");
  ingredients.push(ingredient);
  var textbox = document.getElementById("ingredient");
  textbox.innerHTML = '';
  console.log(ingredients);
}

$('#searchButton').on("click", function () {
	
    $.ajax(
	{	
		type: "POST",
		url: "https://api.edamam.com/api/recipes/v2"+ $("#movie").val(),
		data:'jason',
        success: function (res) {
            if(res["Response"]!="False")
            {   
                //stash button event handler, if there was a title found then toggle on to allow user to save 
                $('#stashButton').attr("disabled", false);

                //validate entry available before for title 
                $("#title").html(res["Title"]);

                if (res["Director"]!= "N/A")
                    $("#director").html(res["Director"]);
                else 
                    $("#director").html("Unavailable ");

                if (res["Released"]!= "N/A")
                    $("#release").html(res["Released"]);
                else 
                    $("#release").html("Unavailable ");

            }
            else
            {
                //stash button even handler disabled if user entered invalid title 
                $('#stashButton').attr("disabled", true);

                //clear the div/card data is invalid entry 
                $("#title").html("");
                $("#director").html("");
                $("#release").html("");
                $("#genre").html("");
                $("#plot").html("");

                alert("Search Entry Not Found or invalid entry");
            }
        },
        error: function (er) {
            alert("Error, unable to access api")
        }
	})
});


$('#saveRecipe').on("click", function () {

//     //retieve data from the prior ajax call that was added to the html 
//     var title = $("#title").html();
//     var director=$("#director").html();
//     var release=$("#release").html();
//     var genre=$("#genre").html();
//     var plot=$("#plot").html();
    
//     //post req. 
//     $.ajax(
//         {
//             url: "/stashMovies",
//             type: "POST",
//             dataType: 'json',
//             contentType: "application/json; charset=utf-8",
//             data: JSON.stringify({
//                 Title: title,
//                 Director: director,
//                 Released: release,
//                 Genre: genre,
//                 Plot: plot
//             }),
//             //redirect to searches once entered/modal button was clicked (go to movie stash)
//             success: function (res) {
//                 location.href='/searches';
//             },
//             error: function (er) {
//                 alert("Error, unable to add to stash ")
//             }
//         })
});