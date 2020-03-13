import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//@ components
import Dashboard from "./components/Dashboard";

import "./App.css";

//@ views
import Landing from "./views/Landing";
import Home from "./views/Home";

//@ utils
import * as ROUTES from "./Routes/routes";

function App({ loggedIn, ...props}) {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
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
          {loggedIn ? (
            <Redirect to='/dashboard' />
          ) : (
            <Landing />
          )}
        </div>
      </Route>
      <PrivateRoute
        path='/dashboard'
        component={Dashboard}
      />
      <Route
        exact
        path={ROUTES.HOME}
        render={props => <Home {...props} />}
      />
    </Router>
  );
}


export default connect(({ userReducer: { loggedIn }}) => ({ loggedIn }), null)(App);
