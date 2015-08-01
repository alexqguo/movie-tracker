"use strict";

(function() {
	var submitButton = document.getElementById("movie-submit");
	var movieInput = document.getElementById("movie-name");
	var movieA = document.getElementById("movie-a");
	var movieS = document.getElementById("movie-s");

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
					console.log(resp);
				})
				.catch(function(xhr, resp, e) {
					alert("There was an error processing the request! Sorry.");
				})
				.complete(function(xhr, resp) {
					console.log(resp);
				});

			// console.log(data);
		}
	}

	submitButton.addEventListener("click", handleInputSubmit);
})();