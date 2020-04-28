import React from "react";
import styled from "styled-components";

/* global google */

const Search = props => {
  const { state, handleInputChange, filterResults } = props;

  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete")
  );

  // Sets autocomplete fields to be returned
  autocomplete.setFields([
    "address_components",
    "formatted_address",
    "geometry",
    "icon",
    "name",
    "place_id"
  ]);

  // When a new place is selected the map will be forced to update
  autocomplete.addListener("place_changed", () => {
    props.updatePlace(autocomplete.getPlace());
    props.handleMapChange();
  });

  const handleFocus = event => event.target.select();

  return (
    <SearchContainer>
      <InputLocation
        id="locationType"
        placeholder="What are you looking for...ex: cafe"
        onChange={handleInputChange}
        value={state.query}
      />
      <LocationInputContainer>
        <InputLocation
          id="autocomplete"
          placeholder="Enter location..."
          onFocus={handleFocus}
        />
        <SearchButton onClick={props.handleMapChange}>Search</SearchButton>
      </LocationInputContainer>
      <ButtonsContainer>
        <ResultsFilterContainer locationLength={state.locations.length}>
          {state.locations.length > 0 ? (
            <Button onClick={filterResults}>Highest Rated</Button>
          ) : null}
          {!state.filterBool ? (
            <p>Results: {state.locations.length}</p>
          ) : (
            <p>Results: {state.locationsFilter.length}</p>
          )}
        </ResultsFilterContainer>
      </ButtonsContainer>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 2rem 0;
  margin 0 auto;

  @media (max-width: 500px) {
    width: 90%;
  };
`;

const InputLocation = styled.input`
  border: none;
  border-bottom: 1px solid black;
  margin: 20px 0 0;
  background: transparent;
  font-size: 20px;
  outline: none;
  min-width: 75%;
`;

const LocationInputContainer = styled.div`
  display: flex;
  max-width: 100%;
`;

const SearchButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  background: gold;
  color: black;
  border-bottom: 1px solid black;
  width: 25%;

  &&:hover {
    background: yellow;
    cursor: pointer;
  }
`;

const ResultsFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  width: ${props => {
    if (props.locationLength <= 0) {
      return "100%";
    } else if (props.locationLength > 0) {
      return "50%";
    }
  }};

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  margin-top: 50px;
  @media (max-width: 800px) {
    margin: 50px 0 0 0;
  }
`;

const Button = styled.button`
  align-self: center;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  width: 200px;
  padding: 10px 56px;
  background: white;
  border-color: white;
  &:hover {
    box-shadow: 0px 5px 5px 0px rgba(176, 170, 176, 1);
    transform: translateY(-2px);
    transition: 0.2s;
  }
`;
