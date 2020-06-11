import React, { useContext, useEffect } from 'react'
import { Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import { fetchSteamUser, fetchGogUser } from './Datas';
import { Context } from '../context/Context';
import './styles/Menu.css'

interface Profile {
  username?: string,
  avatar?: string,
  profileUrl?: string
}

const Menu = () => {
  const { steamUserInfos, gogUserInfos, setSteamUserInfos, setGogUserInfos } = useContext(Context);

  useEffect(() => {
    async function getSteamUserInfos() {
      setSteamUserInfos(await fetchSteamUser())
    }
    async function getGogUserInfos() {
      setGogUserInfos(await fetchGogUser())
    }
    getSteamUserInfos()
    getGogUserInfos()
  }, [])

  const infosAllAccounts = [...steamUserInfos, ...gogUserInfos];

  return (
    <div className="menu-sidebar">
      <h2 className="menu-header">
        <span className='span-account'>Welcome </span>
        <div className='container-user-accounts'>
          {infosAllAccounts.map(({ username, avatar, profileUrl }: Profile, index) => (
            <div key={index} className='container-account'>
              <Image size='mini' circular src={avatar}/>
              <a href={profileUrl}><span className='span-account'>{`${username}`}</span></a>
            </div>
          ))}
        </div>
      </h2>
      <ul className='container-menu-buttons'>
      <li>
        <Link to="/">
          <span className='menu-buttons'>Home</span>
        </Link>
        </li>
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
}

export default Menu
