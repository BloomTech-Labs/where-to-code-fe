import React from "react";
import SignOut from "../../components/Auth/SignOut";
const Dashboard = ({ state, signout }) => {
  return (
    <>
      <h1>Welcome to funkytown,</h1>
      <p>User ID: {state.userID}</p>
      <p>First Name: {state.firstname}</p>
      <p>Last Name: {state.lastname}</p>
      <p>Username: {state.username}</p>

      <SignOut signout={signout} />
    </>
  );
};

export default Dashboard;
