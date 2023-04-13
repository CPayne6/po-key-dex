import styled from "styled-components";
import { PokemonPreview } from "../../state/pokemon/types";
import { RowItem } from "./RowItem";

const ListWrapper = styled.div`
  & {
    z-index: 10;
    position: absolute;
    top: 158px;
    left: 126px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 5px;
    border: 2px solid black;
    background-color: white;
    width: 280px;
    height: 190px;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface ListViewProps {
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  data: PokemonPreview[];
  onSelect: (url: string) => void;
  selectedUrl?: string;
}

/**
 * Display list of pokemon
 */
export function ListView({
  data,
  onSelect,
  onScroll,
  selectedUrl,
}: ListViewProps) {
  return (
    <ListWrapper onScroll={onScroll}>
      {(data || []).map((pokemonPreview) => (
        <RowItem
          key={pokemonPreview.url}
          selected={selectedUrl === pokemonPreview.url}
          preview={pokemonPreview}
          onSelect={onSelect}
        />
      ))}
    </ListWrapper>
  );
}
