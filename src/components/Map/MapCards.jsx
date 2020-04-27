import React, { Component } from "react";
import SingleMapCard from "./SingleMapCard";
import styled from "styled-components";

class MapCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <MapCardsContainer>
        {this.props.locations.map(location => {
          return (
            <div>
              <SingleMapCard
                key={location.id}
                location={location}
              />
            </div>
          );
        })}
      </MapCardsContainer>
    );
  }
}

export default MapCards;

const MapCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  overflow: scroll;
  scroll-behavior: smooth;
  margin-right: -50px;
  padding-right: 50px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;
