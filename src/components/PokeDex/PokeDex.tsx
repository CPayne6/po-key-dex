import styled from "styled-components";
import { Background } from "./Background";
import { useEffect, useState } from "react";
import { ListView } from "./ListView";
import { PokemonDetails } from "../PokemonDetails/PokemonDetails";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useFetch } from "../../hooks/useFetch";
import { PokemonPreview } from "../../state/pokemon/types";
import { addPokemon } from "../../state/pokemon/slice";

// Can move into state to allow user to set this
const pageSize = 10;

// Enforces the requirement to keep the offsets to under 30
// Can modify to allow a higher offset
const offsetLimit = 30;

// Threshold from the bottom to display the next set of data
// Allows for smoother scrolling on the page
const pageScrollOffset = 30;

const PokeDexWrapper = styled.div`
  & {
    position: absolute;
    min-width: 1010px;
    min-height: 590px;
  }
`;

interface PokemonManyResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonPreview[];
}

interface PokeDexProps {
  api: string;
}

export function PokeDex({ api }: PokeDexProps) {
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<string>();
  const pokemonList = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();
  const { fetchUrl } = useFetch();

  /**
   * Loads a new set of pokemon into the Pokedex
   * @param offset
   */
  const loadPokemon = async (offset: number) => {
    if (!loading && offset < offsetLimit) {
      setLoading(true);
      try {
        const { next, results: pokemon }: PokemonManyResponse = await fetchUrl(
          `${api}/pokemon?offset=${offset}&limit=${pageSize}`
        );

        // Append the list of pokemon to the view
        dispatch(addPokemon(pokemon));

        // Prefetch next page (result stored in cache)
        if (next) fetchUrl(next);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
  };

  /**
   * Checks if the container has reached close to the bottom
   *
   * Loads in the new data once the user has crossed the scrolling threshold
   */
  const onScroll = async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollDiv = e.currentTarget;
    if (
      offset < offsetLimit &&
      scrollDiv &&
      scrollDiv.scrollTop + scrollDiv.clientHeight >=
        scrollDiv.scrollHeight - pageScrollOffset
    ) {
      const newOffset = offset + pageSize;
      loadPokemon(newOffset);
      setOffset(newOffset);
    }
  };

  const onPokemonSelect = (url: string) => {
    setSelectedPokemon((prev) => (prev === url ? undefined : url));
  };

  useEffect(() => {
    loadPokemon(offset);
  }, []);

  console.log(loading);

  return (
    <PokeDexWrapper>
      <ListView
        selectedUrl={selectedPokemon}
        onScroll={onScroll}
        data={pokemonList}
        onSelect={onPokemonSelect}
      />
      <PokemonDetails url={selectedPokemon} />
      <Background />
    </PokeDexWrapper>
  );
}
