"use strict";

(function() {
	var movieList = document.getElementById("movie-list");
	var submitButton = document.getElementById("movie-submit");
	var movieInput = document.getElementById("movie-form-name");
	var movieA = document.getElementById("movie-form-a");
	var movieS = document.getElementById("movie-form-s");
	var filterA = document.getElementById("filter-a");
	var filterS = document.getElementById("filter-s");

	function filter() {
		var dataA, dataS;
		var movies = document.getElementsByClassName("movie-item");
		var filterAVal = filterA.checked;
		var filterSVal = filterS.checked;

		for (var i = movies.length - 1; i >= 0; i--) {
			dataA = movies[i].getAttribute("data-a");
			dataS = movies[i].getAttribute("data-s");

			if (filterAVal && dataA === "true" || filterSVal && dataS === "true") {
				movies[i].style.display = "none";
			} else {
				movies[i].style.display = "";
			}
		}
	}

	function clearFilter() {
		var movies = document.getElementsByClassName("movie-item");

		filterA.checked = false;
		filterS.checked = false;

		for (var i = movies.length - 1; i >= 0; i--) {
			movies[i].style.display = "";
		}
	}

	function watchMovie(target) {
		var data = {};
		var url = "/movies/" + target.getAttribute("data-id") + "/update";		

		if (target.getAttribute("data-a")) data.a = true;
		if (target.getAttribute("data-s")) data.s = true;

		qwest.put(url, data, { dataType: "json" })
			.then(function(xhr, resp) {
				var movieItem = target.closest(".movie-item");
				var watcher = data.a ? "a" : "s";

				// WARNING: This gets a bit dirty
				target.style.display = "none";
				movieItem.querySelectorAll(".movie-" + watcher)[0].classList.remove("hidden");
				movieItem.setAttribute("data-" + watcher, "true");

				if (movieItem.getAttribute("data-s") === movieItem.getAttribute("data-a")) {
					movieItem.querySelectorAll(".watched-both")[0].classList.remove("hidden");
				}
			})
			.catch(function(xhr, resp, e) {
				alert("There was an error! I'm lazy so check the console.");
				console.log(xhr);
				console.log(resp);
				console.log(e);
			});
	}

	function handleListClick(e) {
		if (e.target.matches(".watched-by")) {
			watchMovie(e.target);
		} else {
			var movieItem = e.target.closest("li");

			if (movieItem) {
				var movieDetails = movieItem.querySelectorAll(".movie-details")[0];
				movieDetails.classList.toggle("hidden");
			}
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
					alert("There was an error! I'm lazy so check the console.");
					console.log(xhr);
					console.log(resp);
					console.log(e);
				})
		}
	}

	document.getElementById("filter-clear").addEventListener("click", clearFilter);
	document.getElementById("mov-filter").addEventListener("click", filter);
	submitButton.addEventListener("click", handleInputSubmit);
	movieList.addEventListener("click", handleListClick);
})();