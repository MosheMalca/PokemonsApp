export const getImgId = (pokemonId) => {
  return pokemonId.toString().padStart(3, "0"); //Adds the number 0 in the empty place
};
