import React from "react";

import Navigation from "../components/Navigation/index";
import Map from "../components/Map/Map.jsx";
import styled from "styled-components";

const HomeNavBar = styled.div`
  position: static;
  display: flex;
  justify-content: space-between;
  width: 100%;
  button {
    color: black;
  }
  a {
    color: black;
  }
`;

const Home = props => {
  return (
    <div>
      <HomeNavBar>
        <Navigation />
      </HomeNavBar>
      <Map />
    </div>
  );
};

export default Home;
