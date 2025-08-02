const PokemonCard = ({ name, url, onClick }) => {
    const id = url.split("/").filter(Boolean).pop();
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
        <div className="pokemon-card" onClick={onClick}>
            <img src={imageUrl} alt={name} />
            <p>{name}</p>
        </div>
    );
};

export default PokemonCard;
