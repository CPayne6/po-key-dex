import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../state/store";

// Used instead of `useDispatch` and `useSelector` for typescript compatibility (https://redux.js.org/usage/usage-with-typescript)
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
