import React, { useState, useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import { useHistory, useLocation } from 'react-router-dom'

export default (props) => {
  const history = useHistory()
  const location = useLocation()
  const token = localStorage.getItem('token')
  
  const [activeItem, activeItemSetter] = useState('home')
  const [toggle, toggleSetter] = useState(false)

  // console.log('Location:')
  // console.log(location.pathname)
  // console.log(location.state)

  if (location?.state?.from === '/auth') {
    location.state = {}
    toggleSetter(!toggle)
  }

  const handleClickMenu = (itemName, routeName) => {
    activeItemSetter(itemName)
    history.replace(routeName)
    // history.push({ pathname: routeName, state: { from: location.pathname } })
  }

  const makePrivateMenuItem = () => {
    return (
      <div>
        <Menu.Item
          name='my repositories'
          active={activeItem === 'my repositories'}
          onClick={(e, { name }) => handleClickMenu(name, '/myrepo')}
        />
      </div>
    )
  }

  const makeLoginButton = () => {
    return (
      <Menu.Item
        name='login'
        onClick={(_) => {
          toggleSetter(!toggle)
          history.push('/auth')
        }}
      />
    )
  }

  const makeLogoutButton = () => {
    return (
      <Menu.Item
        name='logout'
        onClick={(_) => {
          localStorage.removeItem('token')
          toggleSetter(!toggle)
          history.replace('/')
        }}
      />
    )
  }

  useEffect(() => {
    // 
  }, [])

  return (
    <Menu secondary>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={(e, { name }) => handleClickMenu(name, '/')}
      />
      {token ? makePrivateMenuItem() : null}
      <Menu.Menu position='right'>
        {token ? makeLogoutButton() : makeLoginButton()}
      </Menu.Menu>
    </Menu>
  )
}
