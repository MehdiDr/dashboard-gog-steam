import React from 'react'
import { Link } from "react-router-dom";

import Profile from './Profile';
import './styles/Menu.css'

interface Profile {
  username?: string,
  avatar?: string,
  profileUrl?: string
}

const Menu = () => (
  <div className="menu-sidebar">
    <Profile />
    <ul className='container-menu-buttons'>
      <li>
        <Link to="/wishlist">
          <span className='menu-buttons'>Liste de souhaits</span>
        </Link>
      </li>
      <li>
        <Link to="/friends">
          <span className='menu-buttons'>Amis</span>
        </Link>
      </li>
    </ul>
  </div>
)

export default Menu
