import { useState } from "react";
import { Link } from "react-router-dom";
import type { PokemonCardProps } from "../types/interfaces";

export default function PokemonCard({ pokemon, currentPage, onImageLoad }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    if (onImageLoad) {
      onImageLoad(pokemon.id);
    }
  };

  const handleImageLoad = () => {
    if (onImageLoad) {
      onImageLoad(pokemon.id);
    }
  };

  return (
    <Link
      to={`/details/${pokemon.id}`}
      state={{ fromPage: currentPage }}
      className="block"
    >
      <div className="bg-gray-400 rounded-xl shadow-md transition-all shadow-amber-50 hover:scale-107 hover:shadow-amber-50 cursor-pointer">
        <div className="w-full h-full relative">
          {imageError ? (
            <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          ) : (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-32 h-32 mx-auto"
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          )}
        </div>
        <h3 className="mt-4 text-center text-lg font-semibold capitalize text-gray-800">
          {pokemon.name}
        </h3>
      </div>
    </Link>
  );
}