import React, { useContext, useEffect } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router';

import GamesList from '../components/GamesList/GamesList';
import FilterButtons from '../components/FilterButtons';
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
      <Header className="header" as='h2' icon textAlign='center'>
        <Icon name='play' circular />
        <Header.Content>Liste de souhaits</Header.Content>
      </Header>
      <FilterButtons />
      <GamesList allGames={allGames} />
    </>
  )
}

export default Wishlist;
