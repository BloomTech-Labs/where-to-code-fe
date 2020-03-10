import React from "react";
import styled from "styled-components";

const SignOutButton = styled.button`
  text-decoration: none;
  color: black;
  border: 1px solid gold;
  background-color: gold;
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 5px 20px;
  font-family: "Zilla Slab", serif;
  margin-right: 20px;
  &:hover {
    background-color: yellow;
  }
`;

const SignOut = ({ signout, ...props }) => {
  const { history } = props;
  return (
    <SignOutButton
      onClick={e => {
        signout(e, history);
      }}
    >
      Sign Out
    </SignOutButton>
  );
};

export default SignOut;
