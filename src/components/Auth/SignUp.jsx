import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axiosWithAuth from "../../Helpers/axiosWithAuth";

import * as ROUTES from "../../Routes/routes";

import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background: white;

  p {
    margin-bottom: 33px;
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  background: black;
  color: white;
  position: relative;
  border-radius: 25px 25px 0 0;
  padding: 34px 0 0 0;
  margin-bottom: 55px;
  border-bottom: none;
`;

const StyledForm = styled.form`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center
text-align: center;
margin-bottom: 0px;
background: white;
width: 70%;
`;

const StyledInput = styled.input`
  opacity: 0.5;
  border: none;
  border-bottom: 0.7px solid grey;
  color: grey;
  padding-left: 14px;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  font-family: "Poppins", serif;
  text-align: left;
  height: 30px;
  background: none;
  ::placeholder: gold;
  width: 70%;
`;

//@@GOLD SIGNUP BUTTON
const SignUpButton = styled.button`
  width: 55%;
  border-radius: 10px;
  background: gold;

  color: black;
  height: 10%;
  text-align: center;
  margin-top: 8%;
  font-family: "Zilla Slab", serif;
  font-size: 2rem;
  margin-top: 40px;
  margin-bottom: 85px;
`;

const ExtendedSignUpButton = styled(SignUpButton)`
  color: white;
`;

function SignUpForm(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChanges = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const signup = e => {
    e.perventdefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/userdashboard");
      })
      .catch(err => console.log(err));
  };

  return (
    <FormContainer>
      <StyledHeader>
        <i
          class="fas fa-wifi fa-2x"
          style={{ color: "gold", marginRight: "14px" }}
        ></i>
        <h1>HiveStack</h1>
        <circle fill="white" cx="0" cy="100" r="100" />
        <circle fill="white" cx="200" cy="100" r="100" />
      </StyledHeader>
      <StyledForm onSubmit={signup}>
        <StyledInput
          name="email"
          value={credentials.email}
          onChange={handleChanges}
          type="text"
          placeholder="Email Address"
        />
        <StyledInput
          name="password"
          value={credentials.password}
          onChange={handleChanges}
          type="password"
          placeholder="Password"
        />
      </StyledForm>
      <SignUpButton onClick={signup} primary label="Sign Up">
        Login
      </SignUpButton>
    </FormContainer>
  );
}

export default SignUpForm;
