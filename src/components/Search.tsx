// export default function Search() {
//   return (
//     <div className="flex justify-center px-4 py-3">
//       <label className="flex flex-col h-12 min-w-40 md:w-full lg:w-90">
//         <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
//           <div
//             className="text-[#9e9e47] flex border-none bg-[#f4f4e6] items-center justify-center pl-4 rounded-l-xl border-r-0"
//             data-icon="MagnifyingGlass"
//             data-size="24px"
//             data-weight="regular"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24px"
//               height="24px"
//               fill="currentColor"
//               viewBox="0 0 256 256"
//             >
//               <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
//             </svg>
//           </div>
//           <input
//             placeholder="Bulbasaur, Charmander, Squirtle"
//             className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1c1c0d] focus:outline-0 focus:ring-0 border-none bg-[#f4f4e6] focus:border-none h-full placeholder:text-[#9e9e47] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
//           />
//         </div>
//       </label>
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from 'react';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

// Hook personalizado para debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce del término de búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
      const response = await fetch(
        `http://localhost:3001/pokemon/search?name=${encodeURIComponent(term.trim())}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: Pokemon[] = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error al buscar pokémons:', err);
      setError('Error al buscar pokémons. Por favor, intenta de nuevo.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efecto que se ejecuta cuando cambia el término de búsqueda con debounce
  useEffect(() => {
    searchPokemons(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchPokemons]);

  console.log("searchTerm....", searchTerm)

  // Manejar cambios en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Capitalizar primera letra
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex flex-col justify-center px-4 py-3">
      {/* Input de búsqueda */}
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
            placeholder="Bulbasaur, Charmander, Squirtle"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1c1c0d] focus:outline-0 focus:ring-0 border-none bg-[#f4f4e6] focus:border-none h-full placeholder:text-[#9e9e47] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </label>

      {/* Indicador de carga */}
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9e9e47]"></div>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="text-red-500 text-center py-2 text-sm">
          {error}
        </div>
      )}

      {/* Resultados de búsqueda */}
      {results.length > 0 && !isLoading && (
        <div className="mt-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((pokemon) => (
              <div 
                key={pokemon.id} 
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 border border-gray-200"
              >
                <div className="flex flex-col items-center">
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name}
                    className="w-20 h-20 object-contain mb-2"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-pokemon.png'; // Imagen de fallback
                    }}
                  />
                  <h3 className="text-lg font-medium text-gray-800 text-center">
                    {capitalizeFirstLetter(pokemon.name)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {searchTerm && results.length === 0 && !isLoading && !error && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron pokémons que coincidan con "{searchTerm}"
        </div>
      )}
    </div>
  );
}
