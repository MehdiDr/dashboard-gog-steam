import React, { useContext, memo } from 'react'
import { Image } from 'semantic-ui-react';

import { Context } from '../context/Context';
import './styles/Profile.css'

interface ProfileData {
  username?: string,
  avatar?: string,
  profileUrl?: string
}

const Profile = memo(() => {
  const { userInfos } = useContext(Context);

  return (
    <h2 className="profile-container">
      <span className='span-account'>Welcome </span>
      <div className='container-user-accounts'>
        {userInfos && userInfos.map(({ username, avatar, profileUrl }: ProfileData, index) => (
          <div key={index} className='container-account'>
            <Image size='mini' circular src={avatar}/>
            <a href={profileUrl}><span className='span-account'>{`${username}`}</span></a>
          </div>
        ))}
      </div>
    </h2>
  )
});

export default Profile
