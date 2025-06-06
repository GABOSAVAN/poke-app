import { useState, useEffect, useCallback } from "react";
import type { SmallPokemon } from '../types/interfaces';
import useDebounce from './useDebounce';
import { searchService } from '../services/searchService';

export function usePokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SmallPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce del término de búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Función para realizar la búsqueda
  const searchPokemons = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data: SmallPokemon[] = await searchService.searchPokemons(term);
      setResults(data);
    } catch (err) {
      console.error("Error al buscar pokémons:", err);
      setError("Error al buscar pokémons. Por favor, intenta de nuevo.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efecto que se ejecuta cuando cambia el término de búsqueda con debounce
  useEffect(() => {
    searchPokemons(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchPokemons]);

  // Manejar cambios en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Limpiar resultados
  const clearResults = () => {
    setResults([]);
    setSearchTerm("");
    setError(null);
  };

  return {
    searchTerm,
    results,
    isLoading,
    error,
    handleInputChange,
    clearResults
  };
}