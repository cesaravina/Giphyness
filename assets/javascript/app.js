var topics = ["Wolverine", "Magneto", "Professor X", "Gambit", "Deadpool", "Colossus"];

function xGifMaker(){
	$("#xGifs").empty();

	var xSubmit = $(this).attr("data-name");

	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+xSubmit+"&api_key=dc6zaTOxFJmzC&limit=9";   

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		var gifDiv = $("#xGifs");

		gifArray = response.data;
		gifRating = response.data.raiting;

		for(var i = 0; i<gifArray.length; i++){

			var animate = gifArray[i].images.original.url;
			var still = gifArray[i].images.original_still.url;
			gifRating = gifArray[i].rating;

			$("#xGifs").append("<div class='left'><p>Rating: " + gifRating
				+ "</p><p><img class='mover' id='" + animate 
				+"' src=" + still + "></p><div>");
		};
	});
};

function renderX(){

	$("#xButtons").empty();

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

	$("#x-input").val("");
});

$("#xGifs").on("click", ".mover", function(){

	var moveUrl = $(this).attr("id");
	var stillUrl = $(this).attr("src");

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
