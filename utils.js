// Function to get 'n' random games from an array
function getRandomGames(gameArray, n) {
  const randomGames = [];
  const copy = [...gameArray]; // Create a copy to avoid modifying the original array
  while (randomGames.length < n && copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    randomGames.push(copy.splice(randomIndex, 1)[0]); // Remove and add a random game
  }
  return randomGames;
}

function getAllGames(gameArray, optionalConsole, optionalGenre) {
  if (optionalConsole) {
    return gameArray[optionalConsole] ?? null;
  }
  if (optionalGenre) {
    const games = [];
    for (const consoleName in gameArray) {
      const consoleGames = gameArray[consoleName];
      consoleGames.forEach((game) => {
        if (game.genres.includes(optionalGenre)) {
          games.push(game);
        }
      });
    }
    return games ?? null;
  }
  const games = [];
  for (const consoleName in gameArray) {
    const consoleGames = gameArray[consoleName];
    games.push(...consoleGames);
  }
  return games;
}

function notFoundByConsole(consoleName) {
  console.log("Consola no encontrada: " + consoleName);
}

function displayGames(games) {
  games.forEach((game) => {
    const text = game.isMultiGenre ? " - (multi-género)" : "";
    console.log(
      game.name +
        " - " +
        game.video_console +
        " - " +
        game.genres.join(", ") +
        text
    );
  });
}

module.exports = {
  getRandomGames,
  getAllGames,
  notFoundByConsole,
  displayGames,
};
