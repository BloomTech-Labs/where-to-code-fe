import React, { useState } from "react";
import { connect } from 'react-redux';
import { register } from '../Redux/actions';

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
  border-bottom: none;
`;

const StyledForm = styled.form`
display:flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center
text-align: center;
margin-top: 35px;
width: 90%;
`;

const StyledInput = styled.input`
  opacity: 0.5;
  border: none;
  border-bottom: 0.7px solid grey;
  color: grey;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  font-family: "Poppins", serif;
  text-align: left;
  height: 30px;
  background: none;
  ::placeholder: gold;
  width: 44%;
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
  margin-bottom: 50px;
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

const SignUpForm = ({ register, ...props }) => {
  const [creds, setCreds] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    err: null
  });

  const handleChanges = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value, err: null });
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
          name="username"
          value={creds.username}
          onChange={handleChanges}
          type="text"
          placeholder="Preferred Username..."
        />
        <StyledInput
          name="email"
          value={creds.email}
          onChange={handleChanges}
          type="text"
          placeholder="Email..."
        />
        <StyledInput
          name="firstname"
          value={creds.firstname}
          onChange={handleChanges}
          type="text"
          placeholder="First Name..."
        />
        <StyledInput
          name="lastname"
          value={creds.lastname}
          onChange={handleChanges}
          type="text"
          placeholder="Last Name..."
        />
        <StyledInput
          name="password"
          value={creds.password}
          onChange={handleChanges}
          type="password"
          placeholder="Password"
        />
        <StyledInput
          name="passwordConfirm"
          value={creds.passwordConfirm}
          onChange={handleChanges}
          type="password"
          placeholder="Confirm Password..."
        />
        {creds.err && <StyledError name="err">{creds.err}</StyledError>}
      </StyledForm>
      <SignUpButton
        onClick={e => {
          if (
            creds.username === "" ||
            creds.firstname === "" ||
            creds.lastname === "" ||
            creds.email === "" ||
            creds.password === ""
          ) {
            setCreds({ ...creds, err: "Please complete all fields." });
            return;
          } else if (creds.password !== creds.passwordConfirm) {
            setCreds({
              ...creds,
              err: "Password and confirm fields must match."
            });
            return;
          } else if (!register(e, creds, history)) {
            setTimeout(
              () =>
                setCreds({
                  ...creds,
                  err: "Registration failed. Please try again."
                }),
              2000
            );
            return;
          } else setCreds({ ...creds, err: null });
        }}
        primary
        label="Sign Up"
      >
        Sign Up
      </SignUpButton>
    </FormContainer>
  );
};

export default connect(null, { register })(SignUpForm);
