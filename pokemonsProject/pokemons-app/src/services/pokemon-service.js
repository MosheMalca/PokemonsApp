const domain = "http://localhost:3001";

export const fetchRandomPokemon = async () => {
  const response = await fetch(domain + "/api/pokemons/random"); // Sends an API request to the server to receive the data
  const pokemons = await response.json(); // Waiting for the received gaison file
  return pokemons;
};

export const getPokemonById = async (id) => {
  const response = await fetch(`${domain}/api/pokemons/${id}`);
  const pokemon = await response.json();
  return pokemon;
};

export const editPokemon = async (pokemon) => {
  const response = await fetch(`${domain}/api/pokemons`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemon),
  });
  const editedPokemon = await response.json();
  return editedPokemon;
};

export const createPokemon = async (pokemon) => {
  const response = await fetch(`${domain}/api/pokemons`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemon),
  });
  const result = await response.json();
  return result;
};
