const container = document.querySelector(".moviesContainer");
const searchBar = document.querySelector("input");
const banner = document.querySelector(".bannerSection");
const bar = document.querySelector("form");
const episodeBar = document.createElement("select");
const deleteBtn = document.querySelector(".delete");
const getAPI = async (URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const movies = data.slice(0, 12);
    console.log(movies);
    showCards(movies);
  } catch (error) {
    console.log(error);
  }
};

getAPI(` https://api.tvmaze.com/shows`);

const getEpisodes = async (URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    showEpisodes(data);
  } catch (error) {
    console.log(error);
  }
};

const showCards = (arr) => {
  arr.forEach((movie) => {
    const article = document.createElement("article");
    const title = document.createElement("h5");
    const genresTitle = document.createElement("p");
    const ratingTitle = document.createElement("p");
    const cards = document.querySelectorAll("article");
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
      if (e.target.value !== "") {
        deleteBtn.style.opacity = "1";
        if (!movie.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          article.style.display = "none";
        } else {
          article.style.display = "flex";
        }
      } else {
        deleteBtn.style.opacity = "0";
      }
      deleteBtn.addEventListener("click", () => {
        e.target.value = "";
        deleteBtn.style.opacity = "0";
      });
    });

    cards.forEach((card) => {
      card.addEventListener("click", () => {});
    });
  });
};

const showEpisodes = (arr) => {
  banner.style.display = "none";
  container.innerHTML = "";
  arr.forEach((episode) => {
    const article = document.createElement("article");
    const titleContainer = document.createElement("div");
    const title = document.createElement("p");
    const titleEpi = document.createElement("p");
    const playBtn = document.createElement("a");
    const playEpisode = document.createElement("img");
    const episodeOption = document.createElement("option");
    article.classList.add("cardEpisode");
    titleContainer.classList.add("tContainer");
    container.append(article);
    article.append(titleContainer);
    titleContainer.append(title);
    titleContainer.append(playBtn);
    playBtn.append(playEpisode);
    title.textContent = `S${episode.season}-E${episode.number} ${episode.name}`;
    article.style.backgroundImage = `url(${episode.image.medium})`;
    titleContainer.title = episode.summary.slice(3, -4);
    playEpisode.src =
      "https://cdn.iconscout.com/icon/free/png-256/free-play-button-1422583-1203105.png";

    playBtn.href = `${episode.url}-${episode.season}x${episode.number}-${episode.name}`;
    bar.innerHTML = "";
    bar.append(episodeBar);
    episodeBar.classList.add("dropDown");
    episodeBar.append(episodeOption);
    episodeOption.append(titleEpi);
    titleEpi.textContent = `S${episode.season}-E${episode.number} ${episode.name}`;
  });
};
