import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkToken } from './components/Redux/actions'

//@ components
import Dashboard from './components/Dashboard'
import EditAccount from './components/Dashboard/EditAccount'

import './App.css'

//@ views
import Landing from './views/Landing'
import Home from './views/Home'

//@ utils
import * as ROUTES from "./Routes/routes";

function App({ loggedIn, checkToken, ...props}) {

  useEffect(() => {
    !!localStorage.getItem("token") && checkToken();
  }, [])

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        loggedIn ? <Component {...props} {...rest} /> : <Redirect to='/' />
      }
    />
  );

  return (
    <Router>
      <Route exact path={ROUTES.LANDING}>
        <div className='App'>
          {loggedIn ? <Redirect to='/dashboard' /> : <Landing />}
        </div>
      </Route>
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <Route exact path={ROUTES.HOME} render={props => <Home {...props} />} />
      <Route path='/EditAccount' component={EditAccount} />
    </Router>
  );
}

export default connect(
	({ userReducer: { loggedIn } }) => ({ loggedIn }),
	{ checkToken }
)(App)
