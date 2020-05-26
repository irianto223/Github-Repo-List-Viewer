import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Home from '../pages/home_page'
import MyRepo from '../pages/my_repo_page'
import Auth from '../pages/auth'
import MainMenu from '../components/main_menu'

export default (props) => {
  
  const token = localStorage.getItem('token')

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          // TRUE/FALSE akan diganti dengan kondisi hasil cek token di storage
          return token ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />
        }}
      />
    )
  }

  return (
    <Router>

      <Container>
        <MainMenu />
      </Container>

      <Switch>

        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/auth'>
          <Auth />
        </Route>
        
        <PrivateRoute exact path='/myrepo'>
          <MyRepo />
        </PrivateRoute>

      </Switch>
    </Router>
  )
}
