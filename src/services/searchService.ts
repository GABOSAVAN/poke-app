import type { SmallPokemon } from '../types/interfaces';

export const searchService = {
  searchPokemons: async (term: string): Promise<SmallPokemon[]> => {
    const response = await fetch(
      `http://localhost:3001/pokemon/search?name=${encodeURIComponent(
        term.trim()
      )}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  }
};