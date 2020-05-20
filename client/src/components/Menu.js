import React, { useContext, useEffect } from 'react'
import { Icon, Header, Image } from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";

import { fetchSteamUser, fetchGogUser } from './Datas';
import { Context } from '../context/Context';
import './styles/Menu.css'

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

  const { steamUsername, steamAvatar, steamProfileUrl } = steamUserInfos;
  const { gogUsername, gogAvatar, gogProfileUrl } = gogUserInfos;

  console.log(gogUserInfos)

  return (
    <div className="menu-sidebar">
      <h2 textAlign='center' className="menu-header">
        <span>Welcome : </span>
        <div className='container-user-accounts'>
          <div className='container-account'>
            <Image size='mini' circular src={gogAvatar}/>
            <a href={gogProfileUrl}><span>{`${gogUsername}`}</span></a>
          </div>
          <div className='container-account'>
            <Image size='mini' circular src={steamAvatar}/>
            <a href={steamProfileUrl}>{`${steamUsername}`}</a>
          </div>
        </div>
      </h2>
      <ul className='menu-buttons'>
      <li>
        <Link to="/">
          <span>Home</span>
        </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <span>Liste de souhaits</span>
          </Link>
        </li>
        <li>
          <Link to="/wishlist-compare">
            <span>Amis</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu
