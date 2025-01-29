async function getPokemonData(id) {
  try {
    const getPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!getPokemon.ok) throw new Error("Pokemon data not found.");
    const pokemonData = await getPokemon.json();

    const pokemonInfo = await fetch(pokemonData.species.url);
    const pokemonExtraInfo = await pokemonInfo.json();

    const name = pokemonData.name;
    const height = pokemonData.height;
    const weight = pokemonData.weight;
    const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);
    const habitat = pokemonExtraInfo.habitat
      ? pokemonExtraInfo.habitat.name
      : "Unknown";
    const isLegendary = pokemonExtraInfo.is_legendary;

    const description = pokemonExtraInfo.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const flavorText = description
      ? description.flavor_text
      : "No description available.";

    const imageUrl = pokemonData.sprites.front_default;

    return {
      name,
      height,
      weight,
      types,
      flavorText,
      habitat,
      isLegendary,
      imageUrl,
    };
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
}

async function assignmentTask() {
  const randomPokemon = Math.floor(Math.random() * 151) + 1;
  const pokemon = await getPokemonData(randomPokemon);
  console.log(pokemon);
  if (pokemon) displayPokemonCard(pokemon);
}

function displayPokemonCard(pokemon) {
  document.getElementById("pokemon-name").textContent = pokemon.name;
  document.getElementById("pokemon-image").src = pokemon.imageUrl;
  document.getElementById("pokemon-image").alt = pokemon.name;
  document.getElementById("pokemon-height").textContent = pokemon.height;
  document.getElementById("pokemon-weight").textContent = pokemon.weight;
  document.getElementById("pokemon-types").textContent =
    pokemon.types.join(", ");
  document.getElementById("pokemon-habitat").textContent = pokemon.habitat;
  document.getElementById("pokemon-legendary").textContent = pokemon.isLegendary
    ? "Yes"
    : "No";
  document.getElementById("pokemon-description").textContent =
    pokemon.flavorText;
}

assignmentTask();
