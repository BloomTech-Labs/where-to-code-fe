import React from "react";
import SignOut from "../../components/Auth/SignOut";
const Dashboard = ({ state, signout }) => {
  return (
    <>
      <h1>Welcome to funkytown</h1>
      <SignOut signout={signout} />
    </>
  );
};

export default Dashboard;
