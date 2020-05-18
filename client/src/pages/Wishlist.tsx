import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Icon } from 'semantic-ui-react';

import GamesList from '../components/GamesList';
import './styles/Wishlist.css';

const Wishlist = () => {
  const [steamGamesList, setSteamGamesList] = useState([]);
  const [gamesListGog, setGamesListGog] = useState([])

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

  console.log('gamesListGog', gamesListGog);
  console.log('STEAM', steamGamesList);

  const getGamesList = steamGamesList.reduce((acc, x) => {
    //@ts-ignore
    for (let key in x) acc[key] = x[key];
    return acc;
}, {})

  return (
    <>
    <Header className="header" as='h2' icon textAlign='center'>
      <Icon name='play' circular />
      <Header.Content>Liste de souhaits</Header.Content>
    </Header>
    <GamesList steamGamesInfosArray={getGamesList} gogGamesInfosArray={gamesListGog} />
  </>
  )
}

export default Wishlist;
