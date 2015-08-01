"use strict";

(function() {
	var submitButton = document.getElementById("movie-submit");
	var movieInput = document.getElementById("movie-input");

	function handleInputSubmit(e) {
		e.preventDefault();
		var movieName = movieInput.value;

		if (movieName) {
			alert("Input submitted: " + movieName);
		}
	}

	submitButton.addEventListener("click", handleInputSubmit);
})();