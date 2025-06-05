import { Link } from "react-router-dom";

interface Props {
  pokemon: {
    id: number;
    name: string;
    image: string;
  };
  currentPage: number;
}

export default function PokemonCard({ pokemon, currentPage }: Props) {
  return (
    <Link
      to={`/details/${pokemon.id}`}
      state={{ fromPage: currentPage }}
      className="block"
    >
      <div className="bg-white rounded-2xl shadow-md p-4 transition-all hover:scale-105 hover:shadow-lg cursor-pointer">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h3 className="mt-4 text-center text-lg font-semibold capitalize text-gray-800">
          {pokemon.name}
        </h3>
      </div>
    </Link>
  );
}