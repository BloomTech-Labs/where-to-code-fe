import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  userName,
  setActivity,
  login,
  register,
  signout
} from "./components/Redux/actions";
import Dashboard from "./components/Dashboard";
//@ components

// import PasswordForgetPage from './components/Auth/PasswordForget.jsx'
// import { withAuthentication } from './components/Session'
// import Footer from "./components/Footer/Footer.jsx";

import "./App.css";

//@ views
import Landing from "./views/Landing";
// import Home from "./views/Home";
// import AccountPage from "./views/Account";
// import NetworkPage from "./views/Network";

//@ utils
import * as ROUTES from "./Routes/routes";

function App({ state, setActivity, login, register, signout }) {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );

  return (
    <Router>
      <Route exact path={ROUTES.LANDING}>
        <div className='App'>
          {localStorage.getItem("token") ? (
            <Redirect to='/dashboard' />
          ) : (
            <Landing
              state={state}
              setActivity={setActivity}
              login={login}
              register={register}
            />
          )}
        </div>
      </Route>
      <PrivateRoute path='/dashboard' component={Dashboard} signout={signout} />
      {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
      {/* <Route */}
      {/* // exact // path={ROUTES.HOME}
      // render={props => <Home {...props} place={place} />}
      // /> // <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      //  <Route path={ROUTES.NETWORK} component={NetworkPage} /> */}
    </Router>
  );
}

const mapStateToProps = state => ({ state: state });

export default connect(mapStateToProps, {
  userName,
  setActivity,
  login,
  register,
  signout
})(App);
