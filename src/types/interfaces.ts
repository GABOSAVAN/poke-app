// src/types/interfaces.ts

export interface SmallPokemon {
    id: number;
    name: string;
    image: string;
}

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
            ["showdown"]: {
                front_default: string;
                back_default: string;
            };
        };
    };
}

export interface PokemonGridProps {
    pokemons: SmallPokemon[];
    currentPage: number;
    isLoading: boolean;
}

export interface PokemonCardProps {
    pokemon: SmallPokemon;
    currentPage: number;
    onImageLoad?: (pokemonId: number) => void;
}