import { usePokemonData } from "../hooks/usePokemonData";
import { PokemonGrid } from "./PokemonGrid";

export default function HomePage() {
  const { pokemons, isLoading, hasError, page, total, nextPage, prevPage } = usePokemonData();
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="flex flex-col gap-4 p-4">
      {isLoading && <p className="text-center">Cargando pokemones...</p>}
      {hasError && <p className="text-center text-red-600">Error al cargar los pokemones.</p>}

      <PokemonGrid pokemons={pokemons} />

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="self-center">
          Página {page} de {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
