import React, { useState, useEffect } from 'react';
import { Header, Icon } from 'semantic-ui-react';

import GamesList from '../components/GamesList';
import './styles/Wishlist.css';

const Wishlist = () => {
  const [gamesList, setGamesList] = useState([]);
  const urls = [
    "https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=0",
    "https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=1"
  ];

  useEffect(() => {
    async function fetchData() {
      await Promise.all(urls.map(url => fetch(url)
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
  }, [])

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
    <GamesList gamesInfosArray={[getGamesList]} />
  </>
  )
}

export default Wishlist;
