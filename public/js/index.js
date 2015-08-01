"use strict";

(function() {
	var submitButton = document.getElementById("movie-submit");
	var movieInput = document.getElementById("movie-name");
	var movieA = document.getElementById("movie-a");
	var movieS = document.getElementById("movie-s");

	function addCreatedMovieToList(movie) {
		console.log("add movie " + movie.name);
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

			qwest.post("/movies/create", data, { dataType: "json", responseType: "json" })
				.then(function(xhr, resp) {
					if (resp.status === "SUCCESS") {
						addCreatedMovieToList(resp.movie);
					}

					movieInput.value = "";
				})
				.catch(function(xhr, resp, e) {
					alert("There was an error processing the request! Sorry.");
				})
			// console.log(data);
		}
	}

	submitButton.addEventListener("click", handleInputSubmit);
})();