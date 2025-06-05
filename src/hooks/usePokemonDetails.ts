// hooks/usePokemonDetails.ts
import { useEffect, useState } from "react";
import { pokemonService } from "../services/pokemonService";
import type { Pokemon } from "../types/interfaces";

export const usePokemonDetails = (id: string | undefined) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(false);
        
        if (!id) {
          throw new Error("ID no proporcionado");
        }
        
        const data = await pokemonService.getPokemonById(id);
        setPokemon(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  return {
    pokemon,
    error,
    loading,
    isFlipped,
    setIsFlipped
  };
};