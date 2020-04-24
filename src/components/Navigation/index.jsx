import React, { useState } from "react";
import Modal from "styled-react-modal";

import { withRouter, useHistory } from "react-router-dom";
import { Box, Heading, Button } from "grommet";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import SignUpForm from "../Auth/SignUp.jsx";
import SignInForm from "../Auth/SignIn.jsx";
import SignOutButton from "../Auth/SignOut.jsx";
import styled from "styled-components";

const StyledModal = Modal.styled`
  width: 30rem;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition: opacity ease 1000ms;
  border-radius: 30px;

  @media (max-width: 600px) {
    width: 28rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 500px) {
    width: 25rem;
  }
  @media (max-width: 400px) {
    width: 22rem;
  }
`;

const RegisterLink = styled(Link)`
  text-decoration: none;
  color: black;
  background-color: gold;
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 5px 20px;
  font-family: "Zilla Slab", serif;
  margin-right: 20px;
  &:hover {
    background-color: yellow;
  }
  @media (max-width: 600px) {
    margin: 0px;
  }
  @media (max-width: 500px) {
  }
  @media (max-width: 400px) {
  }
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 80%;
  padding-top: 20px;
  margin: auto;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const NavButtons = styled.div`
  display: flex;
  @media (max-width: 600px) {
    margin-top: 30px;
  }
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: black;
  background-color: white;
  margin-right: 10px;
  font-size: 1.5rem;
  padding: 5px 30px;
  font-family: "Zilla Slab", serif;
  border-radius: 5px;
`;

const SignUpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 20);
  }

  function beforeClose() {
    return new Promise(resolve => {
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  }

  return (
    <div>
      <RegisterLink onClick={toggleModal}>Sign Up</RegisterLink>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <SignUpForm toggleModal={toggleModal} />
      </StyledModal>
    </div>
  );
};

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 20);
  }

  function beforeClose() {
    return new Promise(resolve => {
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  }

  return (
    <div>
      <LoginLink onClick={toggleModal}>Login</LoginLink>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <SignInForm toggleModal={toggleModal} />
      </StyledModal>
    </div>
  );
};

const Navigation = ({ loggedIn }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <Navbar>
      <Box direction="row" gap="small">
        <Heading responsive="false" level="2" margin="none">
          <i
            className="fas fa-wifi"
            style={{ color: "gold", margin: "0px 10px 0px 0px" }}
          ></i>
          <Button
            onClick={handleClick}
            label="HiveStack"
            color="white"
            plain="true"
          />
        </Heading>
      </Box>
      {loggedIn ? <NavigationAuth /> : <NavigationNonAuth />}
    </Navbar>
  );
};

const NavigationAuth = () => (
  <div direction="row" justify="right" gap="small">
    <SignOutButton />
  </div>
);

const NavigationNonAuth = () => {
  return (
    <NavButtons>
      <LoginButton />
      <SignUpButton />
    </NavButtons>
  );
};

export default withRouter(
  connect(({ userReducer: { loggedIn } }) => ({ loggedIn }), null)(Navigation)
);
