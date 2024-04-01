const container = document.querySelector(".moviesContainer");

const movies = [];
const getAPI = async (URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    const article = document.createElement("article");
    const title = document.createElement("h5");
    const genresTitle = document.createElement("p");
    const ratingTitle = document.createElement("p");
    article.classList.add("card");
    container.append(article);
    article.append(title);
    article.append(genresTitle);
    article.append(ratingTitle);
    title.textContent = data.name;
    genresTitle.textContent = data.genres;
    ratingTitle.textContent = data.rating.average;
    article.style.backgroundImage = `url(${data.image.medium})`;
  } catch (error) {
    console.log(error);
  }
};

const names = [
  "game of thrones",
  "the vampire diaries",
  "dark",
  "sherlock",
  "friends",
  "teen wolf",
  "bridgerton",
  "Anne with an E",
  "Breaking Bad",
  "mr robot",
  "Peaky Blinders",
  "riverdale",
];
names.forEach((element) => {
  getAPI(` https://api.tvmaze.com/singlesearch/shows?q=${element}`);
});
