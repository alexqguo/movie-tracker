"use strict";

(function() {
	var movieList = document.getElementById("movie-list");
	var submitButton = document.getElementById("movie-submit");
	var movieInput = document.getElementById("movie-name");
	var movieA = document.getElementById("movie-a");
	var movieS = document.getElementById("movie-s");

	function addCreatedMovieToList(movie) {
		var div = document.createElement("div");
		div.innerHTML = movie;
		movieList.appendChild(div.firstChild);
	}

	function handleInputSubmit(e) {
		e.preventDefault();
		var movieName = movieInput.value;
		var data = {};

		if (movieName) {
			data = {
				name: movieName,
				a: movieA.checked,
				s: movieS.checked
			}

			qwest.post("/movies/create", data, { dataType: "json", responseType: "text" })
				.then(function(xhr, resp) {
					addCreatedMovieToList(resp);
					movieInput.value = "";
				})
				.catch(function(xhr, resp, e) {
					alert("There was an error processing the request! Sorry.");
					console.log(xhr);
					console.log(resp);
					console.log(e);
				})
			// console.log(data);
		}
	}

	submitButton.addEventListener("click", handleInputSubmit);
})();