// DetailsPage.tsx
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemonDetails";

export default function Details() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { pokemon, error, loading, isFlipped, setIsFlipped } =
    usePokemonDetails(id);

  const fromPage = location.state?.fromPage ?? 1;

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-950">
        <p className="text-center font-bold text-white">Cargando detalles...</p>
      </div>
    );

  if (error || !pokemon)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-center text-red-400 font-bold">
          No se pudo cargar el Pokémon.
        </p>
      </div>
    );

  return (
    <div className="px-40 flex flex-1 justify-center py-5 bg-gray-950">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div>
          <button
            onClick={() => navigate("/", { state: { page: fromPage } })}
            className="font-extrabold text-white"
          >
            ← Volver
          </button>
        </div>

        <div className="w-full text-center pb-3">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72 capitalize">
            {pokemon.name}
          </p>
        </div>

        <div className="flex justify-center py-1">
          <div
            className="relative w-100 h-100 cursor-pointer perspective"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Cara frontal */}
              <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={pokemon.sprites.other.showdown.front_default}
                  alt={pokemon.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Cara trasera */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={pokemon.sprites.other.showdown.back_default}
                  alt={`${pokemon.name} back`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 p-3 flex-wrap pr-4">
          <div className="columns-1">
            <h3 className="text-white text-lg flex justify-center font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Types
            </h3>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {pokemon.types.map(({ type }) => (
                <div
                  key={type.name}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f0ea] pl-4 pr-4"
                >
                  <p className="text-[#181811] text-sm font-medium leading-normal capitalize">
                    {type.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="columns-2">
            <div className="columns-1">
              <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Height
              </h3>
              <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
                {(pokemon.height / 10).toFixed(1)} m
              </p>
            </div>

            <div className="columns-1">
              <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Weight
              </h3>
              <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Estadística básicas
        </h3>
        <div className="px-4 py-3 @container">
          <div className="flex overflow-hidden rounded-xl border border-[#e1e1d5] bg-[#fbfbf9]">
            <table className="flex-1">
              <thead>
                <tr className="bg-[#fbfbf9]">
                  <th className="table-col-120 px-4 py-3 text-left text-[#181811] w-[400px] text-sm font-medium leading-normal">
                    Stat
                  </th>
                  <th className="table-col-240 px-4 py-3 text-left text-[#181811] w-[400px] text-sm font-medium leading-normal">
                    Base
                  </th>
                </tr>
              </thead>
              <tbody>
                {pokemon.stats.map(({ stat, base_stat }) => (
                  <tr key={stat.name} className="border-t border-t-[#e1e1d5]">
                    <td className="table-col-120 h-[72px] px-4 py-2 w-[400px] text-[#181811] text-sm font-normal leading-normal capitalize">
                      {stat.name}
                    </td>
                    <td className="table-col-240 h-[72px] px-4 py-2 w-[400px]">
                      <div className="flex h-6 items-center rounded bg-[#e1e1d5] px-1">
                        <div
                          style={{ width: `${base_stat}%` }}
                          className="h-4 rounded bg-[#424532]"
                        />
                      </div>
                      <p className="text-[#181811] text-sm font-semibold leading-normal">
                        {base_stat}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
