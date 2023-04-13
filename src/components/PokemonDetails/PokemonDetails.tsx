import styled from "styled-components";
import { useAsyncData } from "../../hooks/useAsyncData";
import { Pokemon, Sprites } from "../../state/pokemon/types";

const DetailedImage = styled.img`
  & {
    height: 100px;
    width: 100px;
    object-fit: contain;
    margin-top: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    background-color: lightgrey;
  }
`;

const TypesWrapper = styled.div`
  & {
    display: flex;
    margin: 0;
  }
`;

const DescriptionText = styled.p`
  & {
    margin: 0;
  }
`;

const DetailsArea = styled.div`
  & {
    z-index: 10;
    position: absolute;
    top: 175px;
    left: 545px;
    width: 255px;
    height: 285px;
    background-color: white;
    border-radius: 5px;
    display: flex;

    flex-direction: column;
    align-items: center;
  }
`;

/**
 * Recursively find the animated object for the pokemon's image
 *
 * recursive limit of 10
 *
 * @param obj
 */
export function findAnimated(object: Record<string, any>, depth = 0) {
  if (depth >= 10) {
    return undefined;
  }
  let value: undefined | Sprites;
  Object.keys(object).some(function (k) {
    if (k === "animated") {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === "object") {
      value = findAnimated(object[k], depth + 1);
      return value !== undefined;
    }
  });
  return value;
}

interface PokemonCardProps {
  url?: string;
}

export function PokemonDetails({ url }: PokemonCardProps) {
  const { data, loading } = useAsyncData<Pokemon>(url);

  return (
    <DetailsArea>
      {loading ? (
        <h2>Loading</h2>
      ) : data ? (
        <>
          <DetailedImage
            src={
              findAnimated(data)?.front_default ?? data.sprites.front_default
            }
          />
          <h3>
            No. {data.id}{" "}
            {data.name.charAt(0).toUpperCase() + data.name.substring(1)}
          </h3>
          <TypesWrapper>
            <DescriptionText>
              Types: {data.types.map((type) => type.type.name + " ")}{" "}
            </DescriptionText>
          </TypesWrapper>
          <DescriptionText>Height: {data.height / 10} m</DescriptionText>
          <DescriptionText>Weight: {data.weight / 10} kg</DescriptionText>
        </>
      ) : (
        <p>Please select a pokemon</p>
      )}
    </DetailsArea>
  );
}
