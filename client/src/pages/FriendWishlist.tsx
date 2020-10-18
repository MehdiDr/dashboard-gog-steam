import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';

import GamesList from '../components/GamesList/GamesList';
import { fetchSteamFriendWishlist } from '../components/Datas';
import { Context } from '../context/Context';
import './styles/Wishlist.css';

const Wishlist = () => {
  const { steamFriendGamesList, setSteamFriendGamesList } = useContext(Context);
  const { steamId } = useParams();

  useEffect(() => {
    async function getAllDatas() {
      setSteamFriendGamesList(await fetchSteamFriendWishlist(steamId))
    }
    getAllDatas()
  }, [])

  const allGames = steamFriendGamesList;

  return (
    <>
      <GamesList allGames={allGames} />
    </>
  )
}

export default Wishlist;
