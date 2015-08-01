"use strict";

// (function() {
	var movieList = document.getElementById("movie-list");
	var submitButton = document.getElementById("movie-submit");
	var movieInput = document.getElementById("movie-form-name");
	var movieA = document.getElementById("movie-form-a");
	var movieS = document.getElementById("movie-form-s");

	function watchMovie(target) {
		console.log(target);
	}

	function handleListClick(e) {
		if (e.target.matches(".watched-by")) {
			watchMovie(e.target);
		} else {
			var movieItem = e.target.closest("li");
			var movieDetails = movieItem.querySelectorAll(".movie-details")[0];
			movieDetails.classList.toggle("hidden");
		}
	}

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
					movieA.checked = false;
					movieS.checked = false;
				})
				.catch(function(xhr, resp, e) {
					alert("There was an error processing the request! Sorry.");
					console.log(xhr);
					console.log(resp);
					console.log(e);
				})
		}
	}

	submitButton.addEventListener("click", handleInputSubmit);
	movieList.addEventListener("click", handleListClick);
// })();