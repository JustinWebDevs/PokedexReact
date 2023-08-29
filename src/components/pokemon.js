export default function Pokemon({ info }) {
  return (
    <div>
      <div className="infoImage">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${info.id}.png`}
          alt={info.name}
          title={info.name}
        />
      </div>
    </div>
  );
}
