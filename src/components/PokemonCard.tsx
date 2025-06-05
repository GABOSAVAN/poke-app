import { useState } from "react";
import { Link } from "react-router-dom";
import type { PokemonCardProps } from "../types/interfaces";

export default function PokemonCard({ pokemon, currentPage }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link
      to={`/details/${pokemon.id}`}
      state={{ fromPage: currentPage }}
      className="block"
    >
      <div className="bg-white rounded-2xl shadow-md p-4 transition-all hover:scale-105 hover:shadow-lg cursor-pointer">
        <div className="w-32 h-32 mx-auto relative">
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