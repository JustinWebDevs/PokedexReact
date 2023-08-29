import { useState, version } from "react";

export default function PokeForm({ findPokemon }) {
  const [pokemon, setPokemon] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    findPokemon(pokemon);

    setPokemon("");
  }

  function handleChange(e) {
    const value = e.target.value;

    if (value !== "") {
      setPokemon(value);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={pokemon} onChange={handleChange} placeholder="Escribe un pokemon con cadena evolutiva"/>
    </form>
  );
}
