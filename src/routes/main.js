import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/home_page'
import MyRepo from '../pages/my_repo_page'

export default (props) => {
  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          // FALSE akan diganti dengan kondisi hasil cek token di storage
          return false ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />
        }}
      />
    )
  }

  return (
    <Router>
      <Switch>

        <Route exact path='/'>
          <Home />
        </Route>
        
        <PrivateRoute exact path='/me'>
          <MyRepo />
        </PrivateRoute>

      </Switch>
    </Router>
  )
}
