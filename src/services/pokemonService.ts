import type { Pokemon } from "../types/interfaces";

export const pokemonService = {
  async getPokemonById(id: string): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    if (!response.ok) {
      throw new Error("Error al obtener el pokemon");
    }
    
    const data = await response.json();
    return data;
  }
};