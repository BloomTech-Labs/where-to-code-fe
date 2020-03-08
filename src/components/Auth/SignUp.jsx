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
width: 100%
height: 100%;
border-radius: 25px;
background:white;
border: 3px solid gold;

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
  margin-top: -70px;
  border-radius: 30px;
  border: 3px solid gold;
  border-bottom: none;
`;

const StyledForm = styled.form`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center
text-align: center;
margin-top: 30px;
background: white;
width: 70%;
`;

const StyledSvg = styled.svg`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
`;

const StyledInput = styled.input`
  opacity: 0.5;
  // border-radius: 25px;
  border: none;
  border-bottom: 0.7px solid grey;
  color: grey;
  padding: 5px 0 0 10px;
  margin: 10px 0;
  font-size: 18px;
  font-family: "Poppins", serif;
  text-align: left;
  height: 20px;
  background: none;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  ::placeholder: gold;
  width: 70%;
  outline: none;
`;

//@@GOLD SIGNUP BUTTON
const SignUpButton = styled.button`
  width: 55%;
  border-radius: 10px;
  background: black;
  border: 3px solid gold;
  color: white;
  height: 10%;
  text-align: center;
  margin-top: 3%;
  font-family: "Zilla Slab", serif;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledError = styled.div`
  width: 85%;
  padding: 12px;
  background-color: #ffe7e7;
  border: 2px solid #ff9090;
  border-radius: 5px;
  color: #ff9090;
  font-weight: bold;
  text-align: center;
  font-family: "Zilla Slab", serif;
  font-size: 1rem;
  margin-top: 2%;
`;

function SignUpForm(props) {
  const [creds, setCreds] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    err: null
  });

  // console.log(creds)

  const handleChanges = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const signup = e => {
    e.perventdefault();
    axiosWithAuth()
      .post("/login", creds)
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
          class='fas fa-wifi fa-2x'
          style={{ color: "gold", marginRight: "14px" }}
        ></i>
        <h1>HiveStack</h1>
        <StyledSvg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 200 100'
          preserveAspectRatio='none'
        >
          <circle fill='white' cx='0' cy='100' r='100' />
          <circle fill='white' cx='200' cy='100' r='100' />
        </StyledSvg>
      </StyledHeader>
      <StyledForm onSubmit={signup}>
        <StyledInput
          name='username'
          value={creds.username}
          onChange={handleChanges}
          type='password'
          placeholder='Preferred Username...'
        />
        <StyledInput
          name='firstname'
          value={creds.firstname}
          onChange={handleChanges}
          type='text'
          placeholder='First Name...'
        />
        <StyledInput
          name='lastname'
          value={creds.lastname}
          onChange={handleChanges}
          type='text'
          placeholder='Last Name...'
        />
        <StyledInput
          name='email'
          value={creds.email}
          onChange={handleChanges}
          type='text'
          placeholder='Email...'
        />
        <StyledInput
          name='password'
          value={creds.password}
          onChange={handleChanges}
          type='password'
          placeholder='Password'
        />
        <StyledInput
          name='passwordConfirm'
          value={creds.passwordConfirm}
          onChange={handleChanges}
          type='password'
          placeholder='Confirm Password...'
        />
        {creds.err && <StyledError name='err'>{creds.err}</StyledError>}
      </StyledForm>
      <SignUpButton onClick={signup} primary label='Sign Up'>
        Sign Up
      </SignUpButton>
    </FormContainer>
  );
}

export default SignUpForm;
