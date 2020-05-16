import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Icon } from 'semantic-ui-react';

import GamesList from '../components/GamesList';
import './styles/Wishlist.css';

const Wishlist = () => {
  const [gamesList, setGamesList] = useState([]);
  const [gamesListGog, setGamesListGog] = useState([])
  const urls = [
    "https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=0",
    "https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=1"
  ];

  // 4aamDNalEBbjfRLyOtni_QacLiUljP3QP6tVFoOmdFc

  useEffect(() => {
    async function fetchGogWithlist() {
      // @ts-ignore
      await axios.get('https://embed.gog.com/user/wishlist.json', {}, {headers: {'x-Trigger': 'CORS', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer kE00zZ0gI2llQDTZhyC27YLAjtZMg9a0ilmm5e5Fjuw'}})
        .then((res: any) => res.json())
        //@ts-ignore
        .then(res => setGamesListGog(res))
        .catch((err: any) => console.log(err))
    }
    async function fetchData() {
      await Promise.all(urls.map(url => fetch(url, {mode: 'no-cors'})
        .then(res => res.json())
        //@ts-ignore
        .then(res => setGamesList(prevState => {
          return [
            ...prevState,
            res
          ]
        }))
        .catch(err => console.log(err))
      ))
    }
    fetchData()
    fetchGogWithlist()
  }, [])

  console.log('gamesListGog', gamesListGog);

  const getGamesList = gamesList.reduce((acc, x) => {
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
    <GamesList gamesInfosArray={getGamesList} />
  </>
  )
}

export default Wishlist;
