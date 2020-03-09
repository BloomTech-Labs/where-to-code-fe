import React from "react";
import SignOut from "../../components/Auth/SignOut";
import styled from "styled-components";

const StyledDashboadContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 50px;
`;

const Dashboard = ({ state, signout }) => {
  return (
    <StyledDashboadContainer>
      <h1>Welcome to funkytown,</h1>
      <p>User ID: {state.userID}</p>
      <p>First Name: {state.firstname}</p>
      <p>Last Name: {state.lastname}</p>
      <p>Username: {state.username}</p>

      <SignOut signout={signout} />
    </StyledDashboadContainer>
  );
};

export default Dashboard;
