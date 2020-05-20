import React, { useContext, useEffect } from 'react';
import { Header, Icon } from 'semantic-ui-react';

import GamesList from '../components/GamesList/GamesList';
import FilterButtons from '../components/FilterButtons';
import { Context } from '../context/Context';
import './styles/Wishlist.css';

const Wishlist = () => {
  const {steamGamesList, setSteamGamesList, gamesListGog, setGamesListGog} = useContext(Context);

  useEffect(() => {
    async function fetchGogWithlist() {
      try {
        const gogApiResp = await fetch('/api/gog/wishlist');
        const gogData = await gogApiResp.json();

        return setGamesListGog(gogData);
      } catch(e) {
         console.log(e)
      }
    }
    fetchData()
    async function fetchData() {
      try {
        const steamApiResp = await fetch('/api/steam/wishlist')
        const steamData = await steamApiResp.json();

        return setSteamGamesList(steamData);
      } catch(e) {
        console.log(e)
      }
    }
    fetchData()
    fetchGogWithlist()
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
