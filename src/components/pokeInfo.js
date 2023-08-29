import Pokemon from "./pokemon";

export default function PokeInfo({ info, preEvolution, evolution }) {
  const Name = () => {
    return <h1>{info.name[0].toUpperCase() + info.name.substring(1)}</h1>;
  };

  const PreEvolutionData = () => {
    return (
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${preEvolution.id}.png`}
          alt={preEvolution.name}
          title={preEvolution.name}
        />
        <h2>{preEvolution.name[0].toUpperCase() + preEvolution.name.substring(1)}</h2>
      </div>
    );
  };

  const EvolutionData = () => {
    return (
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
          alt={evolution.name}
          title={evolution.name}
        />
        <h2>{evolution.name[0].toUpperCase() + evolution.name.substring(1)}</h2>
      </div>
    );
  };

  return (
    <div className="infoPrincipal">
      <div className="pokeData">
        <Pokemon info={info} />
        <Name />
      </div>
      <div className="evosData">
        {preEvolution ? <PreEvolutionData /> : ""}
        {evolution ? <EvolutionData /> : ""}
      </div>
    </div>
  );
}
