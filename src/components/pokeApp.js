import { useState, useEffect } from "react";
import PokeForm from "./pokeForm";
import PokeInfo from "./pokeInfo";
import Loading from "./loading.js";

export default function PokeApp() {
  const [infoPokemon, setInfoPokemon] = useState(null);
  const [preEvolution, setPreEvolution] = useState(null);
  const [dataEvos, setDataEvos] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [infoPreEvolution, setInfoPreEvolution] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadPokemon(pokemon = "pikachu") {
    try {
      const request = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );

      const json = await request.json();

      return json;
    } catch (error) {
      console.log(`El pokemon ${pokemon} no existe o no ha sido encontrado`);
    }
  }

  async function searchDataEvos(info) {
    try {
      const request = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${info.id}/`
      );

      const json = await request.json();
      setDataEvos(json);
    } catch (error) {
      console.log(error);
    }
  }

  async function findPokemon(pokemon) {
    setLoading(false);
    setInfoPokemon(null);
    setPreEvolution(null);
    setInfoPreEvolution(null);
    setDataEvos(null);

    const info = await loadPokemon(pokemon);
    setInfoPokemon(info);
    await searchDataEvos(info);
  }

  async function searchInfoEvolution(url) {
    try {
      const request = await fetch(url);
      const json = await request.json();
      return json;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function searchData(dataEvos) {
    let url = dataEvos.evolution_chain.url;
    const result = await searchInfoEvolution(url);
    setInfoPreEvolution(result);
    console.log(result);
    if (infoPokemon.name === result.chain.species.name) {
      const evo = result.chain.evolves_to[0].species.name;
      const evolved = await loadPokemon(evo);
      setEvolution(evolved);
    } else if (result.chain.evolves_to[0].species.name === infoPokemon.name) {
      const evo = result.chain.evolves_to[0].evolves_to[0].species.name;
      const evolved = await loadPokemon(evo);
      const preEvo = result.chain.species.name;
      const preEvolved = await loadPokemon(preEvo);
      setEvolution(evolved);
      setPreEvolution(preEvolved);
    } else {
      const preEvo = result.chain.evolves_to[0].species.name;
      const preEvolved = await loadPokemon(preEvo);
      setEvolution(null);
      setPreEvolution(preEvolved);
    }

    setLoading(true);
  }

  useEffect(() => {
    if (dataEvos) {
      searchData(dataEvos);
    }
  }, [dataEvos]);

  function PokeMin() {
    return (
      <div className="pokeApp">
        <div className="header">
          <h1>PokeApp</h1>
          <PokeForm findPokemon={findPokemon} />
        </div>
        {infoPokemon ? (
          <PokeInfo
            info={infoPokemon}
            preEvolution={preEvolution}
            evolution={evolution}
          />
        ) : (
          ""
        )}
      </div>
    );
  }

  return <> {loading ? <PokeMin /> : <Loading />} </>;
}
