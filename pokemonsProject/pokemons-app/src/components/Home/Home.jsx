import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getImgId } from "../../services/get-img-id";
import { fetchRandomPokemon } from "../../services/pokemon-service";
import "./Home.css";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]); // Makes the view prearranged and then displayed

  const getPokemons = async () => {
    const pokemonsT = await fetchRandomPokemon();
    setPokemons(pokemonsT);
  };

  useEffect(() => {
    getPokemons();
  }, []); //dependency array

  return (
    <div id="home">
      <main>
        <h1>Pokemon List</h1>
        <div className="header pokemon-row">
          <div className="img-cell"></div>
          <div className="pokemon-name">Pokemon</div>
        </div>
        {pokemons.map((pokemon) => {
          const imgId = getImgId(pokemon.id);
          const editUrl = "pokemon/" + pokemon.id;
          return (
            <div key={pokemon.id} className="pokemon-row">
              <img
                className="img-cell"
                alt={pokemon.name.english} //  גיבוי במידה ולא יהיה מידע
                src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${imgId}.png`}
              />
              <div className="pokemon-name">
                <Link to={editUrl}>{pokemon.name.english}</Link>
              </div>
            </div>
          );
        })}

        <div>
          <button onClick={getPokemons} className="refresh-btn">
            Refresh
          </button>
        </div>
      </main>
    </div>
  );
};
