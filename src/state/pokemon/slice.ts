import { createSlice } from "@reduxjs/toolkit";
import { PokemonPreview } from "./types";

export const initialState: PokemonPreview[] = [];

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    /**
     * Add pokemon list to the state
     */
    addPokemon: (
      state,
      action: { payload: PokemonPreview[]; type: string }
    ) => {
      console.info("adding pokemon");
      return [...state, ...action.payload];
    },
  },
});

export const { addPokemon } = pokemonSlice.actions;
