import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePokemonData } from "../hooks/usePokemonData";
import { PokemonGrid } from "./PokemonGrid";

export default function HomePage() {
  const location = useLocation();
  const { pokemons, isLoading, hasError, page, total, nextPage, prevPage, setPage } = usePokemonData();
  const totalPages = Math.ceil(total / 20);

  useEffect(() => {
    if (location.state?.page) {
      setPage(location.state.page);
    }
  }, [location.state, setPage]);


  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-950">
      {isLoading && <p className="text-center font-bold text-white">Cargando pokemones...</p>}
      {hasError && <p className="text-center text-red-300">Error al cargar los pokemones.</p>}

      <PokemonGrid pokemons={pokemons} currentPage={page} isLoading={isLoading}/>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="font-bold px-4 py-2 rounded hover:bg-fuchsia-500 text-white"
        >
          Anterior
        </button>

        <span className="self-center text-white">
          Página {page} de {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="font-bold px-4 py-2 rounded hover:bg-fuchsia-500 text-white"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};