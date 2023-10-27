let swiper1 = new Swiper(".one", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".nextone",
    prevEl: ".prevone",
  },
});
let swiper2 = new Swiper(".two", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".nexttwo",
    prevEl: ".prevtwo",
  },
});
let swiper3 = new Swiper(".three", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".nextthree",
    prevEl: ".prevthree",
  },
});
/////////////   MODAL   ////////////////
let signin = document.querySelector("#signin");
signin.addEventListener("click", () => {
  document.querySelector(".modal-signup").showModal();
});
let register = document.querySelector("#register");
register.addEventListener("click", () => {
  document.querySelector(".modal-signup").showModal();
});
// let movieModal = document.querySelector(".modal-movie");
// let swiperSlide = document.querySelector(".mouseenter_film_info");
// console.log(swiperSlide);
// swiperSlide.addEventListener("click", () => {
//   movieModal.showModal();
// });

//////MOVIE MODAL//////////

const openModalMovie = (film, e) => {
  e.preventDefault();

  let movieModal = document.querySelector(".modal-movie");
  movieModal.innerText = "";

  let close = document.createElement("a");
  close.classList.add("close-movie-popup");
  close.href = "";
  close.textContent = "X";

  let movieModalContainer = document.createElement("div");
  movieModalContainer.classList.add("movie-container");

  let movieModalImage = document.querySelector("div");
  movieModalImage.classList.add("movie-image");
  let img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;
  movieModalImage.innerText = "";

  movieModalImage.appendChild(img);

  let movieModalDescription = document.createElement("div");
  movieModalDescription.classList.add("movie-description");

  let movieTitle = document.createElement("h2");
  movieTitle.classList.add("movie-title");
  movieTitle.textContent = film.title;

  let movieYear = document.createElement("h3");
  movieYear.classList.add("release-date");
  movieYear.textContent = film.release_date.substring(0, 4);

  let movieRatings = document.createElement("h2");
  movieRatings.classList.add("ratings");
  movieRatings.innerHTML = `★ <span>${film.vote_average}</span>`;
  console.log(movieRatings);

  let genrList = "";
  film.genre_ids.map((id) => {
    genrList = `${genrList}${genreId[id.toString()]}\\`;
  });
  let genre = document.createElement("h3");
  genre.classList.add("movie-genre");
  genre.textContent = genrList.slice(0, -1);

  let movieSynopsis = document.createElement("p");
  movieSynopsis.classList.add("synopsis");
  movieSynopsis.textContent = film.overview;

  // let movieActors = document.createElement("p");
  // movieActors.classList.add("actors");
  // movieActors.innerHTML = `Cast : <span>${film}</span> `;

  movieModalDescription.appendChild(movieTitle);
  movieModalDescription.appendChild(movieYear);
  movieModalDescription.appendChild(movieRatings);
  movieModalDescription.appendChild(genre);
  movieModalDescription.appendChild(movieSynopsis);
  // movieModalDescription.appendChild(movieActors);

  movieModalContainer.appendChild(movieModalImage);
  movieModalContainer.appendChild(movieModalDescription);

  movieModal.appendChild(close);
  movieModal.appendChild(movieModalContainer);

  console.log(movieModal);
  movieModal.showModal();
};
////////////GENRE ID//////////

const genreId = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

//////////getDivWithFilmInfo/////////

const getDivWithFilmInfo = (film) => {
  let mouseenterFilm = document.createElement("div");
  mouseenterFilm.classList.add("mouseenter_film_info");

  let title = document.createElement("h1");
  title.classList.add("film_title");
  title.textContent = film.original_title;

  let year = document.createElement("p");
  year.classList.add("film_year");
  year.textContent = film.release_date.substring(0, 4);

  let genrList = "";
  film.genre_ids.map((id) => {
    genrList = `${genrList}${genreId[id.toString()]}\\`;
  });
  let genre = document.createElement("p");
  genre.classList.add("film_genres");
  genre.textContent = genrList.slice(0, -1);

  let img = document.createElement("img");
  img.src = "star.svg";

  let points = document.createElement("p");
  points.classList.add("film_points");
  points.textContent = film.vote_average;

  mouseenterFilm.appendChild(title);
  mouseenterFilm.appendChild(year);
  mouseenterFilm.appendChild(genre);
  mouseenterFilm.appendChild(img);
  mouseenterFilm.appendChild(points);

  return mouseenterFilm;
};

/////////////////SEARCH/////////////

const movieSearchInput = document.querySelector(
  '.moviesearch input[type="text"]'
);
const searchBtn = document.querySelector(".open-modal");

const swiperWrappers = document.querySelectorAll(".swiper-wrapper");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjRhZDExZWZhZmZmZTRiZmNhNmYzODkzNDMxNWZiOSIsInN1YiI6IjY1MzUwZWE3YzE0ZmVlMDExZGU3ZmE0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yc1D0lWSGabi-HolSb6b9P3FUqCA2Pj9ukPp3wvJp1s",
  },
};

let firstSwiper = swiperWrappers[0];
/////clean/////
firstSwiper.innerHTML = "";

const searchFilmByName = () => {
  if (movieSearchInput.value.trim() == "") return;

  let searchValue = movieSearchInput.value;
  /////clean/////
  movieSearchInput.value = "";
  ///////////

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.results.length) {
        firstSwiper.innerHTML = "";
        document.querySelector(
          ".results-paragraph"
        ).textContent = `Results for "${searchValue}"`;

        response.results.forEach((film) => {
          if (film.poster_path) {
            let img = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

            let swiperSlideEl = document.createElement("div");
            swiperSlideEl.classList.add("swiper-slide");
            let imgEl = document.createElement("img");
            imgEl.src = `${img}`;
            imgEl.alt = film.title;
            swiperSlideEl.appendChild(imgEl);
            firstSwiper.appendChild(swiperSlideEl);

            let filmInfo = getDivWithFilmInfo(film);

            swiperSlideEl.appendChild(filmInfo);

            swiper1.update();

            swiperSlideEl.addEventListener("click", (e) =>
              openModalMovie(film, e)
            );
          } else {
            console.log(film.title);
          }
        });
      } else {
        document.querySelector(".results-paragraph").textContent =
          "No results found.";
      }
    })
    .catch((err) => console.error(err));
};

searchBtn.addEventListener("click", searchFilmByName);

/////////////Latest releases////////
const loadLatestMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?`,
      options
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);

    let secondSwiper = swiperWrappers[1];
    secondSwiper.innerHTML = "";

    if (data.results) {
      data.results.forEach((film) => {
        let img = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

        let swiperSlideEl = document.createElement("div");
        swiperSlideEl.classList.add("swiper-slide");
        let imgEl = document.createElement("img");
        imgEl.src = img;
        imgEl.alt = film.title;
        swiperSlideEl.appendChild(imgEl);
        secondSwiper.appendChild(swiperSlideEl);

        let filmInfo = getDivWithFilmInfo(film);

        swiperSlideEl.appendChild(filmInfo);

        swiper2.update();

        swiperSlideEl.addEventListener("click", (e) => openModalMovie(film, e));
      });
    } else {
      console.log("No results");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

loadLatestMovies();

////////////GENRE//////////

const loadMoviesGenre = async (genreName = "comedy") => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&query=${genreName}&page=1&include_adult=false`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);

    let thirdSwiper = swiperWrappers[2];
    thirdSwiper.innerHTML = "";

    if (data.results) {
      data.results.forEach((film) => {
        let img = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

        let swiperSlideEl = document.createElement("div");
        swiperSlideEl.classList.add("swiper-slide");
        let imgEl = document.createElement("img");
        imgEl.src = img;
        imgEl.alt = film.title;
        swiperSlideEl.appendChild(imgEl);
        thirdSwiper.appendChild(swiperSlideEl);

        let filmInfo = getDivWithFilmInfo(film);

        swiperSlideEl.appendChild(filmInfo);

        swiper3.update();
        swiperSlideEl.addEventListener("click", (e) => openModalMovie(film, e));
      });
    } else {
      console.log("No results");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
loadMoviesGenre();

///////////CLICK ON LIST OF GENRES////////////////
const genres = document.querySelectorAll(".genre-list a");

genres.forEach((genre) => {
  genre.addEventListener("click", (e) => {
    e.preventDefault();
    const genreName = e.target.textContent.toLowerCase();
    loadMoviesGenre(genreName);
  });
});

// fetch("https://api.themoviedb.org/3/movie/53168/credits", options)
//   .then((response) => response.json())
//   .then((credits) => {
//     // Extract the cast information from the credits response
//     const cast = credits.cast;
//     console.log(cast);
//   })
//   .catch((error) => {
//     console.error("Error fetching movie credits:", error);
//   });
