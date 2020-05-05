import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'


const MenuExampleInvertedVertical = () => {
  const [activeItem, setActiveItem] = useState('home')
  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name })
  return (
    <Menu inverted vertical>
      <Menu.Item
        name='Home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='Historique'
        active={activeItem === 'historique'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='Liste de souhaits'
        active={activeItem === 'wishlist'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='La thune'
        active={activeItem === 'money'}
        onClick={handleItemClick}
      />
    </Menu>
  )
}

export default MenuExampleInvertedVertical
