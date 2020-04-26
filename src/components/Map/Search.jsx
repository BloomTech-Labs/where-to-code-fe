import React from "react";
import styled from "styled-components";

const Search = props => {
  const {
    state,
    handleInputChange,
    handleFocus,
    searchButton,
    filterResults
  } = props;

  return (
    <InputsContainer>
      <InputLocation
        id="locationType"
        placeholder="What are you looking for...ex: cafe"
        onChange={handleInputChange}
        value={state.query}
      />
      <InputLocation
        id="autocomplete"
        placeholder="Enter location..."
        onFocus={handleFocus}
      />
      <InputButtonContainer>
        <Button ref={searchButton}>Search</Button>
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
        <div></div>
      </InputButtonContainer>
    </InputsContainer>
  );
};

export default Search;

const InputButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const InputsContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  align-items: center;
  margin-top: 50px;
  @media (max-width: 800px) {
    margin: 50px 0 0 0;
  }
`;

const InputLocation = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 95%;
  margin-bottom: 20px;
  background: transparent;
  font-size: 20px;
`;

const Button = styled.button`
  align-self: center;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  width: 200px;
  padding: 10px 56px;
  margin: 35px 0 35px;
  background: white;
  border-color: white;
  &:hover {
    box-shadow: 0px 5px 5px 0px rgba(176, 170, 176, 1);
    transform: translateY(-2px);
    transition: 0.2s;
  }
`;
