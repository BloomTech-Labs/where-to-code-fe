import React, { Component, useState } from "react";
import axiosWithAuth, { axioswithAuth } from "../../Helpers/axiosWithAuth";
import { withRouter } from "react-router-dom";
import { SignUpLink } from "./SignUp.jsx";
import { PasswordForgetLink } from "./PasswordForget.jsx";
import * as ROUTES from "../../Routes/routes";
import styled from "styled-components";

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
  margin-top: -140px;
  border-radius: 30px;
  border: 3px solid gold;
  border-bottom: none;
`;

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
  border: 3px solid gold;
`;

const StyledForm = styled.form`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center
text-align: center;
margin-top: 80px;
margin-bottom: 0px;
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
  padding-left: 14px;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  font-family: "Poppins", serif;
  text-align: left;
  height: 30px;
  background: none;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  ::placeholder: gold;
  width: 70%;
`;

//@@GOLD LOGIN BUTTON
const LoginButton = styled.button`
  width: 55%;
  border-radius: 10px;
  background: gold;
  border: 1px solid gold;
  color: black;
  height: 10%;
  text-align: center;
  margin-top: 8%;
  font-family: "Zilla Slab", serif;
  font-size: 2rem;
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
`;

const SignInForm = ({ login, ...props }) => {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
    err: null
  });

  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
      err: null
    });
  };

  const { history } = props;

  return (
    <FormContainer>
      <StyledHeader>
        <i
          className='fas fa-wifi fa-2x'
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
      <StyledForm>
        <StyledInput
          name='email'
          value={creds.email}
          onChange={handleChange}
          type='text'
          placeholder='Email Address'
        />
        <StyledInput
          name='password'
          value={creds.password}
          onChange={handleChange}
          type='password'
          placeholder='Password'
        />

        {creds.err && <StyledError name='err'>{creds.err}</StyledError>}
      </StyledForm>
      <LoginButton
        onClick={e => {
          if (creds.email === "" || creds.password === "") {
            setCreds({ ...creds, err: "Please complete all fields." });
            return;
          } else if (!login(e, creds, history)) {
            setTimeout(
              () =>
                setCreds({
                  ...creds,
                  err: "Login failed. Please try again."
                }),
              2000
            );
            return;
          } else setCreds({ ...creds, err: null });
        }}
        primary
        label='Sign In'
      >
        Login
      </LoginButton>
      <br></br>
      <PasswordForgetLink />
    </FormContainer>
  );
};

export default withRouter(SignInForm);
