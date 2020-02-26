import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { withFirebase } from "../../Firebase";
import styled from "styled-components";
import * as ROUTES from "../../Routes/routes";

function SignOutForm(props) {


  const [credentials, setCredentials] = useState({username: "", password: ""});
  
  // console.log(credentials)
  
  const handleChanges = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  
        const signin = (e) => {
          e.perventdefault()
            axiosWithAuth().post("/login", credentials)
              .then(res => {
                localStorage.setItem("token", res.data.token)
                props.history.push("/userdashboard")
              })
              .catch(err => console.log(err))
        };
  
  
  
  
  
    return(
      <FormContainer>
              <StyledHeader>
                 <i class="fas fa-wifi fa-2x"
                     style={{ color: "gold", marginRight: "14px" }}></i>
                  <h1>HiveStack</h1>
                <StyledSvg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none">
                  <circle fill="white" cx="0" cy="100" r="100" />
                  <circle fill="white" cx="200" cy="100" r="100" />
                </StyledSvg>
              </StyledHeader>
              <StyledForm onSubmit={signin}>
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
              <SignUpButton
                onClick={signin}
                primary
                label="Sign In"
              >
                Login
              </SignUpButton>
            </FormContainer>
    )
  }

// class SignOutButton1 extends Component {
//   submit = e => {
//     this.props.firebase.doSignOut().then(() => {
//       this.props.history.push(ROUTES.LANDING);
//     });
//   };

//   render() {
//     return (
//       <>
//         <Signout type="button" onClick={this.submit}>
//           Sign Out
//         </Signout>
//       </>
//     );
//   }
// }

// const SignOutButton = withRouter(withFirebase(SignOutButton1));

// export default SignOutButton;

const Signout = styled.button`
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
