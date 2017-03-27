// You should get in the habit of wrapping your js code in either a 

// $(document).ready(function(){
//  // code goes here
// })

// or an IIFE (immediately invoked function expression)
// ;(function(){
//  // code goes here
// })()

// One of the most important reasons for that is security - because right now your global variables
// can be tampered with through the console by a malicious visitor 😮

var topics = ["Wolverine", "Magneto", "Professor X", "Gambit", "Deadpool", "Colossus"];

function xGifMaker(){
	$("#xGifs").empty();

	var xSubmit = $(this).attr("data-name");

	// adding `https` for the same reasons I detailed in your index.html file.
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+xSubmit+"&api_key=dc6zaTOxFJmzC&limit=9";   

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		var gifDiv = $("#xGifs");

		// You want to declare your variables using the `var` keyword. Otherwise,
		// this variable will be defined on the global scope which could potentially
		// cause issues with variable collisions and also would allow anyone to tamper
		// with your variable through the console.
		var gifArray = response.data;

		// this will set gifRating to `undefined` since you misspelled `rating`.
		// gifRating = response.data.raiting;

		for(var i = 0; i<gifArray.length; i++){

			var animate = gifArray[i].images.original.url;
			var still = gifArray[i].images.original_still.url;
			var gifRating = gifArray[i].rating;

			// Appending html using multiple lines of concatenated strings is rather 
			// unsightly and also more error prone than other methods.
			// For instance, you could create the div, paragraph, and image tags
			// using jQuery and then use the jQuery methods to set attributes and content.
			$("#xGifs").append("<div class='left'><p>Rating: " + gifRating
				+ "</p><p><img class='mover' id='" + animate 
				+"' src=" + still + "></p><div>");
		};
	});
};

function renderX(){
	// camelCasing is totally valid for css class and id names, but the general convention is to use hyphens `-` to separate words
	$("#xButtons").empty();

	// when iterating over the values in an array, feel free to use the native `.forEach` method
	// one particularly useful side effect of that approach is that it creates a functional context
	// for each iteration of the loop which helps prevent variables from being attached to the global scope object
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
	for (var i = 0; i< topics.length; i++){
		var button = $("<button>");
		
		button.addClass("xClass");
		button.attr("data-name", topics[i]);
		button.text(topics[i]);

		$("#xButtons").append(button);
	};
};

$("#addXMan").on("click", function(event){
	event.preventDefault();

	var x = $("#x-input").val().trim();

	topics.push(x);
	renderX();

	// good job keeping track of the ui's state
	$("#x-input").val("");
});

$("#xGifs").on("click", ".mover", function(){

	var moveUrl = $(this).attr("id");
	var stillUrl = $(this).attr("src");

	// You probably don't want to set the `id` to be the other url. Instead, you might consider
	// setting two attributes like `data-animate` and `data-still` when you're creating the
	// gif elements, and then set `src` to the appropriate url given the state of the gif.
	$(this).attr("id", stillUrl);
	$(this).attr("src", moveUrl);
	$(this).attr("class", "makeStill");
});

$("#xGifs").on("click", ".makeStill", function(){

	var moveUrl = $(this).attr("src");
	var stillUrl = $(this).attr("id");

	$(this).attr("id", moveUrl);
	$(this).attr("src", stillUrl);
	$(this).attr("class", "mover");
});

$("#xButtons").on("click", ".xClass", xGifMaker);

renderX();
