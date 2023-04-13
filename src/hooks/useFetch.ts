import { useAppDispatch, useAppSelector } from "../hooks";
import { cacheRequest } from "../state/cache/slice";

/**
 * Returns the functionality to fetch a url and cache the response
 *
 * Will read from cache if request has already been made
 *
 */
export function useFetch() {
  const cache = useAppSelector((state) => state.cache);
  const dispatch = useAppDispatch();

  /**
   * Fetch from the url and cache the response
   *
   * Extends additional options from plain fetch
   */
  const fetchUrl = async (url: string, options?: RequestInit) => {
    if (cache[url]) {
      console.log("returning from cache");
      return cache[url];
    }
    const response = await fetch(url, options);
    const data = await response.json();
    dispatch(cacheRequest({ response: data, url: url }));
    return data;
  };

  return {
    fetchUrl,
  };
}
