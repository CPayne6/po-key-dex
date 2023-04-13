import { createSlice } from "@reduxjs/toolkit";

export const initialState: Record<string, any> = {};

export const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    /**
     * Caches the response of a request
     */
    cacheRequest: (
      state,
      action: { payload: { response: any; url: string }; type: string }
    ) => {
      state[action.payload.url] = action.payload.response;
    },
    clearCache: (state) => {
      state = {};
    },
  },
});

export const { cacheRequest, clearCache } = cacheSlice.actions;
