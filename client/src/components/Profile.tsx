import React, { useContext, useEffect } from 'react'
import { Image } from 'semantic-ui-react';

import { fetchSteamUser, fetchGogUser } from './Datas';
import { Context } from '../context/Context';
import './styles/Profile.css'

interface ProfileData {
  username?: string,
  avatar?: string,
  profileUrl?: string
}

const Profile = () => {
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
    <h2 className="profile-container">
      <span className='span-account'>Welcome </span>
      <div className='container-user-accounts'>
        {infosAllAccounts.map(({ username, avatar, profileUrl }: ProfileData, index) => (
          <div key={index} className='container-account'>
            <Image size='mini' circular src={avatar}/>
            <a href={profileUrl}><span className='span-account'>{`${username}`}</span></a>
          </div>
        ))}
      </div>
    </h2>
  )
}

export default Profile
