import React, { useState, useEffect } from 'react';
import { Header, Icon } from 'semantic-ui-react';

import GamesList from '../components/GamesList';
import './styles/Purchases.css';

const Purchases = () => {
  const [gamesList, setGamesList] = useState([]);

  const fetchData: any = async () => {
    const urls = [
      "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=0",
      "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=1"
    ]

    await Promise.all(urls.map(url => fetch(url)
      .then(res => res.json())
      .then(res => setGamesList(res))
      .catch(err => console.log(err))
    ))
  };

  useEffect(() => fetchData(), [])

  const gamesInfos = gamesList && Object.values(gamesList)

  return (
    <>
    <Header className="header" as='h2' icon textAlign='center'>
      <Icon name='play' circular />
      <Header.Content>Liste de souhaits</Header.Content>
    </Header>
    <GamesList gamesInfos={gamesInfos} />
  </>
  )
}

export default Purchases;
