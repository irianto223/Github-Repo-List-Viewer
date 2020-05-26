import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export default (props) => {
  const history = useHistory()
  const [activeItem, activeItemSetter] = useState('home')

  const token = localStorage.getItem('token')

  const handleClickMenu = (itemName, routeName) => {
    activeItemSetter(itemName)
    history.push(routeName)
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
        onClick={(_) => history.push('/auth')}
      />
    )
  }

  const makeLogoutButton = () => {
    return (
      <Menu.Item
        name='logout'
        onClick={(_) => null}
      />
    )
  }

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
