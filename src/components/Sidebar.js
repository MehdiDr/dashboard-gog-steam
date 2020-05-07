import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'

import './styles/Sidebar.css'


const MenuExampleInvertedVertical = () => {
  const [activeItem, setActiveItem] = useState('home')
  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name })
  return (
    <Menu inverted vertical fixed="left">
      <Menu.Item
        className="menu-item"
        name='Home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
      />
      <Menu.Item
        className="menu-item"
        name='Historique'
        active={activeItem === 'historique'}
        onClick={handleItemClick}
      />
      <Menu.Item
        className="menu-item"
        name='Liste de souhaits'
        active={activeItem === 'wishlist'}
        onClick={handleItemClick}
      />
      <Menu.Item
        className="menu-item"
        name='La thune'
        active={activeItem === 'money'}
        onClick={handleItemClick}
      />
    </Menu>
  )
}

export default MenuExampleInvertedVertical
