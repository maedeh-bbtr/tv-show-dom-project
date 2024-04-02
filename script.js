const container = document.querySelector(".moviesContainer");
const searchBar = document.querySelector("input");
const getAPI = async (URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    const movies = data.slice(0, 12);
    showCards(movies);
  } catch (error) {
    console.log(error);
  }
};

getAPI(` https://api.tvmaze.com/shows`);

const showCards = (arr) => {
  arr.forEach((movie) => {
    const article = document.createElement("article");
    const title = document.createElement("h5");
    const genresTitle = document.createElement("p");
    const ratingTitle = document.createElement("p");
    article.classList.add("card");
    container.append(article);
    article.append(title);
    article.append(genresTitle);
    article.append(ratingTitle);
    title.textContent = movie.name;
    genresTitle.textContent = movie.genres;
    ratingTitle.textContent = movie.rating.average;
    article.style.backgroundImage = `url(${movie.image.medium})`;

    searchBar.addEventListener("input", (e) => {
      if (!movie.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        article.style.display = "none";
      } else {
        console.log(movie.name);
        article.style.display = "flex";
      }
    });
  });
};
