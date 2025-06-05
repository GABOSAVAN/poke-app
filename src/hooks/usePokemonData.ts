// src/hooks/usePokemonData.ts

import { useEffect, useState } from 'react';
import { getPokemons } from '../services/getPokemons';
import type { Pokemon } from '../services/getPokemons';

export const usePokemonData = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 20;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const { results, total } = await getPokemons(limit, offset);
        setPokemons(results); // ✅ results es un Pokemon[]
        setTotal(total);
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemons();
  }, [page, offset]);

  const nextPage = () => {
    if (page < Math.ceil(total / limit)) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    pokemons,
    isLoading,
    hasError,
    page,
    total,
    nextPage,
    prevPage,
    setPage,
  };
};