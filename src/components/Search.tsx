import { Link } from "react-router-dom";
import { usePokemonSearch } from "../hooks/usePokemonSearch";

export default function Search() {
  const {
    searchTerm,
    results,
    isLoading,
    error,
    handleInputChange,
    clearResults,
  } = usePokemonSearch();

  // Capitalizar primera letra
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Manejar click en resultado (opcional para cerrar resultados)
  const handleResultClick = () => {
    clearResults();
  };

  return (
    <div className="relative flex flex-col justify-center px-4 pt-3 pb-0">
      {/* Input de búsqueda */}
      <div className="flex justify-center">
        <label className="flex flex-col h-12 min-w-40 md:w-full lg:w-90">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              className="text-[#9e9e47] flex border-none bg-[#f4f4e6] items-center justify-center pl-4 rounded-l-xl border-r-0"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              placeholder="Buscar Pokemon..."
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1c1c0d] focus:outline-0 focus:ring-0 border-none bg-[#f4f4e6] focus:border-none h-full placeholder:text-[#9e9e47] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
        </label>
      </div>

      {/* Resultados de búsqueda flotantes */}
      {(results.length > 0 || isLoading || error) && searchTerm && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-40 md:w-full lg:w-90">
          {/* Indicador de carga */}
          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#9e9e47]"></div>
            </div>
          )}
          {/* Mensaje de error */}
          {error && (
            <div className="text-red-500 text-center py-3 px-4 text-sm border-b border-gray-100">
              {error}
            </div>
          )}
          {/* Resultados de búsqueda */}
          {results.length > 0 && !isLoading && (
            <div className="max-h-80 overflow-y-auto">
              <div className="flex flex-col items-center">
                {results.map((pokemon) => (
                  <Link
                    key={pokemon.id}
                    to={`/details/${pokemon.id}`}
                    onClick={handleResultClick}
                    className="block hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 w-full max-w-sm"
                  >
                    <div className="px-4 py-3 flex items-center space-x-3 justify-center">
                      {/* Pokemon info */}
                      <div className="flex-1 text-center">
                        <h3 className="text-gray-800 font-medium">
                          {capitalizeFirstLetter(pokemon.name)}
                        </h3>                        
                      </div>

                      {/* Arrow icon */}
                      <div className="text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* Mensaje cuando no hay resultados */}
          {searchTerm && results.length === 0 && !isLoading && !error && (
            <div className="text-center py-4 px-4 text-gray-500 text-sm">
              No se encontraron pokémons que coincidan con "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
