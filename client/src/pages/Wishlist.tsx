import React, { useContext, useEffect } from 'react';
import { Header, Icon } from 'semantic-ui-react';

import GamesList from '../components/GamesList/GamesList';
import FilterButtons from '../components/FilterButtons';
import {fetchGogWithlist, fetchData} from '../components/Datas';
import { Context } from '../context/Context';
import './styles/Wishlist.css';

const Wishlist = () => {
  const {steamGamesList, setSteamGamesList, gamesListGog, setGamesListGog} = useContext(Context);

  useEffect(() => {
    async function getAllDatas() {
      setSteamGamesList(await fetchData())
      setGamesListGog(await fetchGogWithlist())
    }
    getAllDatas()
  }, [])

  const allGames= [...steamGamesList, ...gamesListGog]

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
