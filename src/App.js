import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { userName } from "./components/Redux/actions";

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

function App({ state, userName }) {
  const [place, setPlace] = useState("");

  return (
    <Router>
      <Route exact path={ROUTES.LANDING}>
        <div className='App'>
          <Landing state={state} setPlace={setPlace} />
        </div>
      </Route>
      {/* //{" "} */}
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

export default connect(mapStateToProps, { userName })(App);
