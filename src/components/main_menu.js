import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export default (props) => {
  const history = useHistory()
  const [activeItem, activeItemSetter] = useState('home')

  const handleClickMenu = (itemName, routeName) => {
    activeItemSetter(itemName)
    history.push(routeName)
  }

  return (
    <Menu secondary>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={(e, { name }) => handleClickMenu(name, '/')}
      />
      <Menu.Item
        name='my repositories'
        active={activeItem === 'my repositories'}
        onClick={(e, { name }) => handleClickMenu(name, '/myrepo')}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          onClick={(e, { name }) => null}
        />
      </Menu.Menu>
    </Menu>
  )
}
