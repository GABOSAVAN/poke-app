export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PokemonListResponse {
  results: { name: string; url: string }[];
  count: number;
}

export const getPokemons = async (limit = 20, offset = 0): Promise<{ results: Pokemon[]; total: number }> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemons');
  }

  const data: PokemonListResponse = await response.json();

  const results = data.results.map((pokemon, index) => {
    const id = offset + index + 1;

    return {
      id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });

  return {
    results,
    total: data.count,
  };
};
