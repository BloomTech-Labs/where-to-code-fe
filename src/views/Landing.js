/*global google*/
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation/index";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";

import * as ROUTES from "../Routes/routes";
import { updatePlace } from "../components/Redux/actions";
import { connect } from "react-redux";

const Landing = props => {
  const activities = ["code", "study", "stream"];
  const [number, setNumber] = useState(1);

  useEffect(() => {
    let activityTimer = setTimeout(() => {
      number === activities.length - 1 ? setNumber(0) : setNumber(number + 1);
    }, 2000);

    return function cleanup() {
      clearTimeout(activityTimer);
    };
  }, [number]);

  useEffect(() => {
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("exploreAutoComplete")
    );
    autocomplete.setFields([
      "address_components",
      "formatted_address",
      "geometry",
      "icon",
      "name",
      "place_id"
    ]);
    autocomplete.addListener("place_changed", () => {
      props.updatePlace(autocomplete.getPlace());
      props.history.push(ROUTES.HOME);
    });
  }, []);

  return (
    <LandingPageContainer>
      <Navigation />
      <LandingScreen>
        <SearchComponent>
          <h2>
            Find a place to <span>{activities[number]}</span> near you
          </h2>

          <InputAndButtonContainer>
            <Input id="exploreAutoComplete" placeholder="Explore" size="40" />
            <GoButton to={ROUTES.HOME}>Go</GoButton>
          </InputAndButtonContainer>
        </SearchComponent>
      </LandingScreen>
    </LandingPageContainer>
  );
};

export default withRouter(connect(null, { updatePlace })(Landing));

const SearchComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin: 0 0 32px 0;
    color: white;
    font-family: "'Zilla Slab', serif";
    font-size: 48px;
    font-weight: normal;

    span {
      font-weight: bold;
    }

    @media (max-width: 600px) {
      font-size: 50px;
      width: 80%;
      text-align: center;
      line-height: 1;

      h2 {
        text-align: center;
      }
    }

    @media (max-width: 500px) {
      font-size: 40px;
      width: 80%;
      text-align: center;
      line-height: 1;

      h2 {
        text-align: center;
      }
    }
  }
  span {
    color: gold;
  }
`;

const LandingPageContainer = styled.div`
  background: url("/heroimage.svg");
  background-size: cover;
`;

const LandingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  @media (max-width: 600px) {
    height: 87vh;
  }
`;

const GoButton = styled(Link)`
  display: flex
  align-items: center;
  text-decoration: none;
  font-family: "Zilla Slab", serif;
  font-size: 2rem;
  color: black;
  border-radius: 0 10px 10px 0;
  background: gold;
  border: 1px solid gold;
  border-left: none;
  padding: 0 10px 0 10px;
  &:hover {
    background: yellow;
  }
`;

const Input = styled.input`
  height: 44px;
  border-radius: 10px 0 0 10px;
  border-right: none;
  border: 1px solid white;
  padding-left: 10px;
  &::placeholder {
    vertical-align: center;
    font-size: 1rem;
  }
  @media (max-width: 500) {
    width: 50px;
  }
`;

const InputAndButtonContainer = styled.div`
  display: flex;
`;
