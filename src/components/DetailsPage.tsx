import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
}

export default function Details() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Error al obtener el pokemon");
        const data = await response.json();
        setPokemon(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPokemon();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-center font-bold">Cargando detalles...</p>
      </div>
    );
  if (error || !pokemon)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-center text-red-600 font-bold">
          No se pudo cargar el Pokémon.
        </p>
      </div>
    );

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="w-full text-center">
          <p className="text-[#181811] tracking-light text-[32px] font-bold leading-tight min-w-72 capitalize">
            {pokemon.name}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex justify-center w-130 h-130 grow @container p-4">
            <div className="w-full gap-1 overflow-hidden @[480px]:gap-2 aspect-[2/3] rounded-xl flex object-contain">
              <div
                className="w-full bg-center bg-no-repeat aspect-auto rounded-none flex-1"
                style={{
                  backgroundImage: `url(${pokemon.sprites.other["official-artwork"].front_default})`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 p-3 flex-wrap pr-4">
          <div className="columns-1">
            <h3 className="text-[#181811] text-lg flex justify-center font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
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
              <h3 className="text-[#181811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Height
              </h3>
              <p className="text-[#181811] text-base font-normal leading-normal pb-3 pt-1 px-4">
                {(pokemon.height / 10).toFixed(1)} m
              </p>
            </div>

            <div className="columns-1">
              <h3 className="text-[#181811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Weight
              </h3>
              <p className="text-[#181811] text-base font-normal leading-normal pb-3 pt-1 px-4">
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-[#181811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Base Stats
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
                    <td className="table-col-240 h-[72px] px-4 py-2 w-[400px] text-[#86865f] text-sm font-normal leading-normal">
                      {base_stat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <style>
            {`
              @container (max-width: 120px) {
                .table-col-120 { display: none; }
              }
              @container (max-width: 240px) {
                .table-col-240 { display: none; }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}
