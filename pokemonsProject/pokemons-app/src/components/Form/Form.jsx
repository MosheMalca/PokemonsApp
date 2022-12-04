import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getImgId } from "../../services/get-img-id";
import {
  createPokemon,
  editPokemon,
  getPokemonById,
} from "../../services/pokemon-service";
import "./Form.css";

const emptyPokemon = {
  name: { english: "" },
  type: "",
  base: {
    HP: "",
    Attack: "",
    Defense: "",
    "Sp. Attack": "",
    "Sp. Defense": "",
    Speed: "",
  },
};

export const Form = () => {
  const params = useParams(); // gets paramaters from the url
  const isEditing = params.pokemonId; // if we have pokemonId in the parmas, we know we are in editing mode

  // state, setState - things we get react useState hook
  // state - the current data
  // setState - a function that changes the state
  const [pokemon, setPokemon] = useState(emptyPokemon); // starts with empty pokemon
  useEffect(() => {
    if (isEditing) {
      getPokemon();
    } else {
      setPokemon(emptyPokemon);
    }
    // run when the component first mounts, or when pokemonId (from params) changes
  }, [params.pokemonId]);

  const getPokemon = async () => {
    const pokemon = await getPokemonById(params.pokemonId);
    setPokemon({ ...pokemon, type: pokemon.type.join(", ") });
    // The join adds between the words in the string ","
  };

  const handleEditPokemon = async (e) => {
    e.preventDefault();
    const editedPokemon = { ...pokemon, type: pokemon.type.split(", ") }; // SPLITE Converts to a string array and outputs the " ,"
    await editPokemon(editedPokemon);
  };

  const handleAddPokemon = async (e) => {
    e.preventDefault(); // לא מרענן את העמוד
    const newPokemon = { ...pokemon, type: pokemon.type.split(", ") };
    await createPokemon(newPokemon);
  };

  const imgSrc =
    isEditing && pokemon.id
      ? `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${getImgId(
          pokemon.id
        )}.png`
      : "/pokemon-logo.png";

  return (
    <main id="form">
      <h1>{isEditing ? "Edit" : "Add"} Pokemon</h1>
      <div className="form-container">
        <img src={imgSrc} alt="pokemon"></img>
        <form onSubmit={isEditing ? handleEditPokemon : handleAddPokemon}>
          <div className="input-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={pokemon.name.english}
              onChange={(event) =>
                setPokemon((currentState) => {
                  return {
                    ...currentState,
                    name: { english: event.target.value },
                  };
                })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="type">Type: </label>
            <input
              type="text"
              name="type"
              id="type"
              value={pokemon.type}
              onChange={(e) =>
                setPokemon((currentState) => {
                  return { ...currentState, type: e.target.value };
                })
              }
            />
          </div>
          <label>Base: </label>
          <div className="base">
            <div className="input-group">
              <label htmlFor="hp">HP: </label>
              <input
                type="text"
                name="hp"
                id="hp"
                value={pokemon.base.HP}
                onChange={(e) =>
                  setPokemon((currentState) => {
                    return {
                      ...currentState,
                      base: { ...currentState.base, HP: e.target.value },
                    };
                  })
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor="attack">Attack: </label>
              <input
                type="text"
                name="attack"
                id="attack"
                value={pokemon.base.Attack}
                onChange={(e) =>
                  setPokemon((currentState) => {
                    return {
                      ...currentState,
                      base: { ...currentState.base, Attack: e.target.value },
                    };
                  })
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor="defense">Defense: </label>
              <input
                type="text"
                name="defense"
                id="defense"
                value={pokemon.base.Defense}
                onChange={(e) =>
                  setPokemon((currentState) => {
                    return {
                      ...currentState,
                      base: { ...currentState.base, Defense: e.target.value },
                    };
                  })
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor="sp-attack">Sp. Attack: </label>
              <input
                type="text"
                name="sp-attack"
                id="sp-attack"
                value={pokemon.base["Sp. Attack"]}
                onChange={(e) =>
                  setPokemon((currentState) => {
                    return {
                      ...currentState,
                      base: {
                        ...currentState.base,
                        "Sp. Attack": e.target.value,
                      },
                    };
                  })
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor="sp-defense">Sp. Defense: </label>
              <input
                type="text"
                name="sp-defense"
                id="sp-defense"
                value={pokemon.base["Sp. Defense"]}
                onChange={(e) =>
                  setPokemon((currentState) => {
                    return {
                      ...currentState,
                      base: {
                        ...currentState.base,
                        "Sp. Defense": e.target.value,
                      },
                    };
                  })
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor="speed">Speed: </label>
              <input
                type="text"
                name="speed"
                id="speed"
                value={pokemon.base.Speed}
                onChange={(e) =>
                  setPokemon((currentState) => {
                    return {
                      ...currentState,
                      base: { ...currentState.base, Speed: e.target.value },
                    };
                  })
                }
              />
            </div>
          </div>
          <div>
            <button className="backBtn">
              <Link to="/">Back</Link>
            </button>
            <button type="submit" className="saveBtn">
              {isEditing ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
