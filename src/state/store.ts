import { configureStore } from "@reduxjs/toolkit";
import { cacheSlice } from "./cache/slice";
import { pokemonSlice } from "./pokemon/slice";

export const store = configureStore({
  preloadedState: {
    cache: cacheSlice.getInitialState(),
    pokemon: pokemonSlice.getInitialState(),
  },
  reducer: {
    cache: cacheSlice.reducer,
    pokemon: pokemonSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
