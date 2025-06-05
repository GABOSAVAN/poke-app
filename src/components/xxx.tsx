// este es mi homePage component "// HomePage.tsx
// import { usePokemonData } from "../hooks/usePokemonData";
// import { PokemonGrid } from "./PokemonGrid";

// export default function HomePage() {
//   const { pokemons, isLoading, hasError, page, total, nextPage, prevPage } = usePokemonData();
//   const totalPages = Math.ceil(total / 20);
//   console.log("pagina actual = ", page)

//   return (
//     <div className="flex flex-col gap-4 p-4">
//       {isLoading && <p className="text-center">Cargando pokemones...</p>}
//       {hasError && <p className="text-center text-red-600">Error al cargar los pokemones.</p>}

//       <PokemonGrid pokemons={pokemons} currentPage={page} />

//       <div className="flex justify-center gap-4 mt-6">
//         <button
//           onClick={prevPage}
//           disabled={page === 1}
//           className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
//         >
//           Anterior
//         </button>

//         <span className="self-center">
//           Página {page} de {totalPages}
//         </span>

//         <button
//           onClick={nextPage}
//           disabled={page === totalPages}
//           className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
//         >
//           Siguiente
//         </button>
//       </div>
//     </div>
//   );
// };
// ", este es mi componente PokemonGrid "// PokemonGrid.tsx
// import PokemonCard from "./PokemonCard";
// import Search from "./Search";

// interface SmallPokemon {
//   id: number;
//   name: string;
//   image: string;
// }

// interface Props {
//   pokemons: SmallPokemon[];
//   currentPage: number;
// }

// export const PokemonGrid = ({ pokemons, currentPage }: Props) => {
//   return (
//     <div className="sm:px20 md:px-40 flex flex-1 justify-center py-5">
//       <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
//         <Search />
//         <div className="flex flex-wrap justify-between gap-3 p-4">
//           <p className="text-[#1c1c0d] tracking-light text-[32px] font-bold leading-tight min-w-72">
//             Pokemon List
//           </p>
//         </div>
//         <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-4">
//             {pokemons.map((pokemon) => (
//               <PokemonCard key={pokemon.id} pokemon={pokemon} currentPage={currentPage} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// ", este es mi componente PokemonCard "import { Link } from "react-router-dom";

// interface Props {
//   pokemon: {
//     id: number;
//     name: string;
//     image: string;
//   };
//   currentPage: number;
// }

// export default function PokemonCard({ pokemon, currentPage }: Props) {
//   return (
//     <Link
//       to={`/details/${pokemon.id}`}
//       state={{ page: currentPage }}
//       className="block"
//     >
//       <div className="bg-white rounded-2xl shadow-md p-4 transition-all hover:scale-105 hover:shadow-lg cursor-pointer">
//         <img
//           src={pokemon.image}
//           alt={pokemon.name}
//           className="w-32 h-32 mx-auto"
//         />
//         <h3 className="mt-4 text-center text-lg font-semibold capitalize text-gray-800">
//           {pokemon.name}
//         </h3>
//       </div>
//     </Link>
//   );
// }
// ", este es mi componente DetailsPage "// DetailsPage.tsx
// import { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

// export interface Pokemon {
//   id: number;
//   name: string;
//   height: number;
//   weight: number;
//   types: {
//     slot: number;
//     type: {
//       name: string;
//       url: string;
//     };
//   }[];
//   stats: {
//     base_stat: number;
//     stat: {
//       name: string;
//     };
//   }[];
//   sprites: {
//     other: {
//       ["showdown"]: {
//         front_default: string;
//         back_default: string;
//       };
//     };
//   };
// }

// export default function Details() {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [pokemon, setPokemon] = useState<Pokemon | null>(null);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isFlipped, setIsFlipped] = useState(false);

//   // Get fromPage from location.state or default to 1
//   const fromPage = location.state?.fromPage ?? 1;
//   console.log("fromPage...", fromPage )

//   useEffect(() => {
//     const fetchPokemon = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//         if (!response.ok) throw new Error("Error al obtener el pokemon");
//         const data = await response.json();
//         setPokemon(data);
//       } catch {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchPokemon();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen w-screen">
//         <p className="text-center font-bold">Cargando detalles...</p>
//       </div>
//     );
//   if (error || !pokemon)
//     return (
//       <div className="flex items-center justify-center h-screen w-screen">
//         <p className="text-center text-red-600 font-bold">
//           No se pudo cargar el Pokémon.
//         </p>
//       </div>
//     );

//   return (
//     <div className="px-40 flex flex-1 justify-center py-5">
//       <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
//         <button
//           onClick={() => navigate("/", { state: { page: fromPage } })}
//           className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//         >
//           ← Volver
//         </button>

//         <div className="w-full text-center">
//           <p className="text-[#181811] tracking-light text-[32px] font-bold leading-tight min-w-72 capitalize">
//             {pokemon.name}
//           </p>
//         </div>

//         <div className="flex justify-center py-10">
//           <div
//             className="relative w-80 h-80 cursor-pointer perspective"
//             onClick={() => setIsFlipped(!isFlipped)}
//           >
//             <div
//               className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
//                 isFlipped ? "rotate-y-180" : ""
//               }`}
//             >
//               {/* Cara frontal */}
//               <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden flex items-center justify-center">
//                 <img
//                   src={pokemon.sprites.other.showdown.front_default}
//                   alt={pokemon.name}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               {/* Cara trasera */}
//               <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden flex items-center justify-center">
//                 <img
//                   src={pokemon.sprites.other.showdown.back_default}
//                   alt={`${pokemon.name} back`}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center gap-3 p-3 flex-wrap pr-4">
//           <div className="columns-1">
//             <h3 className="text-[#181811] text-lg flex justify-center font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
//               Types
//             </h3>
//             <div className="flex gap-3 p-3 flex-wrap pr-4">
//               {pokemon.types.map(({ type }) => (
//                 <div
//                   key={type.name}
//                   className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f0ea] pl-4 pr-4"
//                 >
//                   <p className="text-[#181811] text-sm font-medium leading-normal capitalize">
//                     {type.name}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="columns-2">
//             <div className="columns-1">
//               <h3 className="text-[#181811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
//                 Height
//               </h3>
//               <p className="text-[#181811] text-base font-normal leading-normal pb-3 pt-1 px-4">
//                 {(pokemon.height / 10).toFixed(1)} m
//               </p>
//             </div>

//             <div className="columns-1">
//               <h3 className="text-[#181811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
//                 Weight
//               </h3>
//               <p className="text-[#181811] text-base font-normal leading-normal pb-3 pt-1 px-4">
//                 {(pokemon.weight / 10).toFixed(1)} kg
//               </p>
//             </div>
//           </div>
//         </div>

//         <h3 className="text-[#181811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
//           Base Stats
//         </h3>
//         <div className="px-4 py-3 @container">
//           <div className="flex overflow-hidden rounded-xl border border-[#e1e1d5] bg-[#fbfbf9]">
//             <table className="flex-1">
//               <thead>
//                 <tr className="bg-[#fbfbf9]">
//                   <th className="table-col-120 px-4 py-3 text-left text-[#181811] w-[400px] text-sm font-medium leading-normal">
//                     Stat
//                   </th>
//                   <th className="table-col-240 px-4 py-3 text-left text-[#181811] w-[400px] text-sm font-medium leading-normal">
//                     Base
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pokemon.stats.map(({ stat, base_stat }) => (
//                   <tr key={stat.name} className="border-t border-t-[#e1e1d5]">
//                     <td className="table-col-120 h-[72px] px-4 py-2 w-[400px] text-[#181811] text-sm font-normal leading-normal capitalize">
//                       {stat.name}
//                     </td>
//                     <td className="table-col-240 h-[72px] px-4 py-2 w-[400px]">
//                       <div className="flex h-6 items-center rounded bg-[#e1e1d5] px-1">
//                         <div
//                           style={{ width: `${base_stat}%` }}
//                           className="h-4 rounded bg-[#424532]"
//                         />
//                       </div>
//                       <p className="text-[#181811] text-sm font-semibold leading-normal">
//                         {base_stat}
//                       </p>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// " y este es mi hook UsePokemonData "// src/hooks/usePokemonData.ts

// import { useEffect, useState } from 'react';
// import { getPokemons } from '../services/getPokemons';
// import type { Pokemon } from '../services/getPokemons';

// export const usePokemonData = () => {
//   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const limit = 20;
//   const offset = (page - 1) * limit;

//   useEffect(() => {
//     const loadPokemons = async () => {
//       setIsLoading(true);
//       setHasError(false);

//       try {
//         const { results, total } = await getPokemons(limit, offset);
//         setPokemons(results); // ✅ results es un Pokemon[]
//         setTotal(total);
//       } catch (error) {
//         console.error(error);
//         setHasError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadPokemons();
//   }, [page, offset]);

//   const nextPage = () => {
//     if (page < Math.ceil(total / limit)) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   const prevPage = () => {
//     if (page > 1) {
//       setPage((prev) => prev - 1);
//     }
//   };

//   return {
//     pokemons,
//     isLoading,
//     hasError,
//     page,
//     total,
//     nextPage,
//     prevPage,
//   };
// };
// ", agregale la solucion para mantener la pagina desde la cual se accedio al detalle del pokemon. manten los componentes tal cual estan, solo agregale el comportamiento para regresar a la pagina de homePage desde la cual se accedio a los detalles del pokemon. No me expliques los pasos solo dame el codigo de los componentes y el hook con los cambios realizados.