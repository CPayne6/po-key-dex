import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

interface Options {
  onload: boolean;
}

/**
 * Uses the useFetch hook to call the url and load from the cache if present
 *
 * Will abort previous requests made with this hook
 *
 * Can be extended to allow for cache overriding
 *
 * @param url
 * @returns
 */
export function useAsyncData<Response>(url?: string) {
  const [data, setData] = useState<Response>();
  const [abortController, setAbortController] = useState<AbortController>();
  const { fetchUrl } = useFetch();

  /**
   * Fetch from the url, if load is interrupted then cancel previous request
   */
  const sendRequest = async () => {
    if (!url) {
      return setData(undefined);
    }

    // Abort a previous request made from this hook
    if (abortController) {
      abortController.abort();
    }

    try {
      const localController = new AbortController();
      setAbortController(localController);
      const data: Response = await fetchUrl(url, {
        signal: localController.signal,
      });
      setData(data);
      setAbortController(undefined);
    } catch (err) {
      console.info("request aborted");
    }
  };

  useEffect(() => {
    sendRequest();
  }, [url]);

  return {
    data,
    loading: abortController !== undefined,
  };
}
