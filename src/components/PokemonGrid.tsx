import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import PokemonSkeleton from "./PokemonSkeleton";
import Search from "./Search";
import type { PokemonGridProps } from "../types/interfaces";

export const PokemonGrid = ({ pokemons, currentPage, isLoading }: PokemonGridProps) => {
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isLoading) {
      setImagesLoaded(new Set());
    }
  }, [pokemons, currentPage, isLoading]);

  const handleImageLoad = (pokemonId: number) => {
    setImagesLoaded(prev => {
      const newSet = new Set(prev);
      newSet.add(pokemonId);
      return newSet;
    });
  };

  useEffect(() => {
  }, [imagesLoaded.size, pokemons.length, isLoading]);

  const shouldShowSkeletons = isLoading;

  return (
    <div className="sm:px20 md:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <Search />
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#1c1c0d] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Pokemon List
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-4 relative">
            {shouldShowSkeletons
              ? Array.from({ length: 20 }).map((_, index) => (
                  <PokemonSkeleton key={`skeleton-${index}`} />
                ))
              : pokemons.map((pokemon) => (
                  <PokemonCard 
                    key={pokemon.id} 
                    pokemon={pokemon} 
                    currentPage={currentPage}
                    onImageLoad={handleImageLoad}
                  />
                ))
            }
            
            {isLoading && pokemons.length > 0 && (
              <div className="absolute -top-[9999px] left-0 opacity-0 pointer-events-none">
                {pokemons.map((pokemon) => (
                  <img
                    key={`preload-${pokemon.id}`}
                    src={pokemon.image}
                    alt=""
                    onLoad={() => handleImageLoad(pokemon.id)}
                    onError={() => handleImageLoad(pokemon.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};