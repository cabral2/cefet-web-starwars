// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
import { play } from "./music.js";
import { roman } from "./roman.js";

const API_ENDPOINT = "https://swapi.dev/api";

play(
  {
    audioUrl: "audio/tema-sw.mp3",
    coverImageUrl: "imgs/logo.svg",
    title: "Intro",
    artist: "John Williams",
  },
  document.body
);

const request = await fetch(API_ENDPOINT + "/films/");
const movies = (await request.json()).results;
const formatedMovies = movies
  .sort((a, b) => {
    return a.episode_id - b.episode_id;
  })
  .map((movie) => ({
    ...movie,
    episode_id: roman(movie.episode_id),
  }));

const moviesContainer = document.getElementById("filmes").children[0];
moviesContainer.innerHTML = "";

formatedMovies.map((movie) => {
  const li = document.createElement("li");
  li.innerHTML = `Episode ${movie.episode_id} - ${movie.title}`;
  li.addEventListener("click", () => {
    const container = document.getElementsByTagName("pre")[0];
    container.innerHTML = `Episode ${movie.episode_id}\n ${movie.title}\n\n ${movie.opening_crawl}`;

    restartAnimation(container);
  });

  moviesContainer.appendChild(li);
});
