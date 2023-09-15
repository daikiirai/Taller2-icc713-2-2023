// you can use this variable like this: videoGames.N64 to get the N64 video games list
const videoGames = require("./load-games.js");
const {
  getRandomGames,
  getAllGames,
  notFoundByConsole,
  displayGames,
} = require("./utils.js");
// DEMO CODE
// opciones de consola y genero
// GBA PS2 N64

// cambiar estas variables para probar las funciones
const consoleToShow = "N64";
const genreToShow = "Action";
const gameToShow = "SUpEr MArIo 64";

// Show all video games from specific console
// se renombra la variable console ya q estaba reservada por sistema
function showVideoGamesFromConsole(consolev) {
  console.log(videoGames[consolev]);
}

// Show all video games by console
function showVideoGamesByConsole() {
  console.log(videoGames.GBA);
  console.log(videoGames.PS2);
  console.log(videoGames.N64);
}

// Recomendar 2 juegos para una consola específica
function recommendGamesForConsole(consoleName) {
  const consoleGames = videoGames[consoleName];
  if (consoleGames) {
    console.log("Reccomendaciones para " + consoleName + ":");
    const randomGames = getRandomGames(consoleGames, 2);
    displayGames(randomGames);
  } else {
    notFoundByConsole(consoleName);
  }
}

// Recomendar 3 juegos para un género específico independientemente de la consola
function recommendGamesByGenre(genre, amount, consoleOptional) {
  const games = [];
  const consoleGames = consoleOptional
    ? getAllGames(videoGames, consoleOptional)
    : getAllGames(videoGames);
  if (consoleGames) {
    const text = consoleOptional ? " en " + consoleOptional : "";
    consoleGames.forEach((game) => {
      if (game.genres.includes(genre)) {
        games.push(game);
      }
    });
    const randomGames = getRandomGames(games, amount);
    if (randomGames.length > 0) {
      console.log("Recomendaciones para el género " + genre + text + ":");
      displayGames(randomGames);
    } else {
      console.log(
        "No se encontraron juegos para el género " + genre + text + "."
      );
    }
  } else {
    notFoundByConsole(consoleOptional);
  }
}

function searchGameByName(gameName) {
  console.log("Buscando juego: " + gameName + "...");
  const foundGame = Object.values(videoGames)
    .flatMap((consoleGames) => consoleGames)
    .find((game) => game.name.toLowerCase() === gameName.toLowerCase());
  foundGame
    ? console.log(
        "Juego encontrado: " +
          foundGame.video_console +
          " - " +
          foundGame.genres.join(", ")
      )
    : console.log("Juego no encontrado en nuestra base de datos: " + gameName);
}

function showAllGamesByGenre(genre) {
  const games = getAllGames(videoGames, null, genre);

  // add isMultiGenre property to each game
  games.forEach((game) => {
    game.isMultiGenre = game.genres.length > 1;
  });

  // games contains an array of games and each game has a property called isMultiGenre

  const text = games.length != 1 ? " juegos" : " juego";
  console.log(
    "Se encontraron " + games.length + text + " para el género " + genre
  );
  displayGames(games);
}

console.log("------------------------------------------");
// recomendar 3 juegos para una consola específica
recommendGamesForConsole(consoleToShow);
console.log("------------------------------------------");
// recomendar 3 juegos para un género específico independientemente de la consola
recommendGamesByGenre(genreToShow, 3, null);
console.log("------------------------------------------");
// recomendar 1 juego para un género específico en una consola específica
recommendGamesByGenre(genreToShow, 1, consoleToShow);
console.log("------------------------------------------");
// buscar un juego por nombre
searchGameByName(gameToShow);
console.log("------------------------------------------");
// mostrar todos los juegos de un género específico
showAllGamesByGenre(genreToShow);
console.log("------------------------------------------");
