import styled from "styled-components";
import { useAsyncData } from "../../hooks/useAsyncData";
import { Pokemon, PokemonPreview } from "../../state/pokemon/types";
import { findAnimated } from "../PokemonDetails";

const ImageSkeleton = styled.div`
  & {
    width: 1em;
    height: 1em;
    background-color: lightgrey;
    border-radius: 0.5px;
  }
`;

const TextSkeleton = styled.div<{ width: number }>`
  & {
    width: ${({ width }) => `${width}em`};
  }
`;

const PokemonSprite = styled.img<{ selected: boolean }>`
  & {
    height: 40px;
    width: 40px;
    object-fit: contain;
    ${({ selected }) => (selected ? "animation-name: jiggle;" : "")}
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
  }

  @keyframes jiggle {
    0% {
      margin-top: 0px;
    }
    50% {
      margin-top: -4px;
    }
    100% {
      margin-top: 0px;
    }
  }
`;

const StyledItem = styled.div<{ selected: boolean }>`
  & {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    width: 100%;
    border: 1px solid grey;
    ${({ selected }) => (selected ? "background-color: lightblue;" : "")}
  }

  &:hover {
    ${({ selected }) =>
      !selected ? "background-color: #eaeaea;" : ""} cursor: pointer;
  }
`;

interface RowItemProps {
  preview: PokemonPreview;
  onSelect: (url: string) => void;
  selected: boolean;
}

/**
 * Individual row for a pokemon
 *
 * Uses useAsyncData hook to retrieve pokemon data from the cache
 */
export function RowItem({ preview, onSelect, selected }: RowItemProps) {
  const { data, loading } = useAsyncData<Pokemon>(preview.url);
  return (
    <StyledItem selected={selected} onClick={() => onSelect(preview.url)}>
      {loading || data === undefined ? (
        <>
          <ImageSkeleton />
          <TextSkeleton width={5} />
          <TextSkeleton width={15} />
        </>
      ) : (
        <>
          <PokemonSprite selected={selected} src={data.sprites.front_default} />
          <p>No. {data.id}</p>
          <h3>{data.name.charAt(0).toUpperCase() + data.name.substring(1)}</h3>
        </>
      )}
    </StyledItem>
  );
}
