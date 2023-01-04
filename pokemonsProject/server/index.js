const express = require("express");
//const fs = require("fs");
const cors = require("cors");
const app = express();
const pokedex = require("./pokedex.json");
let pokedexTmp = pokedex;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
flag = true;

const getRandomInt = (min, max) => {
  const diff = max - min;
  return Math.round(min + Math.random() * diff);
};

app.get("/api/pokemons/random", (_req, res) => {
  if (pokedexTmp.length < 5) pokedexTmp = pokedex;

  const randomPokemon = [];
  for (let index = 0; index < 5; index++) {
    const pokemonIndex = getRandomInt(0, pokedexTmp.length - 1);
    const pokemon = pokedexTmp[pokemonIndex];
    randomPokemon.push(pokemon);

    pokedexTmp = pokedexTmp
      .slice(0, pokemonIndex)
      .concat(pokedexTmp.slice(pokemonIndex + 1));
  }

  res.json(randomPokemon);
});

// const removeAt = (arr, n) => {
//   return arr.slice(0, n).concat(arr.slice(n + 1));
// };

app.get("/api/pokemons/:id", (req, res) => {
  const pokemonId = req.params.id;
  const pokemon = pokedex[pokemonId - 1];

  res.json(pokemon);
});

app.put("/api/pokemons", (req, res) => {
  const pokemon = req.body;
  pokedex[pokemon.id - 1] = pokemon;
  // fs.writeFileSync("pokedex.json", JSON.stringify(pokedex, null, 2));
  res.json({ success: true });
});

app.post("/api/pokemons", (req, res) => {
  const pokemon = req.body;
  pokedex.push({ id: pokedex.length, ...pokemon });
  // fs.writeFileSync("pokedex.json", JSON.stringify(pokedex, null, 2));
  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
