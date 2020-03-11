import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { PasswordForgetLink } from "./PasswordForget.jsx";
import styled from "styled-components";
import { connect } from 'react-redux';
import { login } from '../Redux/actions';

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

//@@GOLD LOGIN BUTTON
const LoginButton = styled.button`
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
          className="fas fa-wifi fa-2x"
          style={{ color: "gold", marginRight: "14px" }}
        ></i>
        <h1>HiveStack</h1>
        <circle fill="white" cx="0" cy="100" r="100" />
        <circle fill="white" cx="200" cy="100" r="100" />
      </StyledHeader>
      <StyledForm>
        <StyledInput
          name="email"
          value={creds.email}
          onChange={handleChange}
          type="text"
          placeholder="Email Address"
        />
        <StyledInput
          name="password"
          value={creds.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />

        {creds.err && <StyledError name="err">{creds.err}</StyledError>}
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
        label="Sign In"
      >
        Login
      </LoginButton>
      <br></br>
      <PasswordForgetLink />
    </FormContainer>
  );
};

export default withRouter(connect(null, { login })(SignInForm))
