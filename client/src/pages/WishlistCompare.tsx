import React, { useState, useEffect } from 'react';
import { Header, Icon, Input } from 'semantic-ui-react';
import _ from 'lodash';

import GamesList from '../components/GamesList/GamesList';
import './styles/Wishlist.css';

const WishlistCompare = () => {
  const [gamesList, setGamesList] = useState([]);
  const [gamesListFromId, setGamesListFromId] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const [ownedGames, setOwnedGames] = useState([]);

  const getGamesList = gamesList.reduce((acc, x) => {
    //@ts-ignore
    for (let key in x) acc[key] = x[key];
    return acc;
  }, {})

  const getGamesListFromId = gamesListFromId && gamesListFromId.reduce((acc, x) => {
    //@ts-ignore
    for (let key in x) acc[key] = x[key];
    return acc;
  }, {})

  // 76561198055354458 David
  // 76561197981598546 Nero

  const urls = [
    "https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=0",
    "https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=1",
    `https://store.steampowered.com/wishlist/profiles/${inputValue}/wishlistdata/?p=0`,
    `https://store.steampowered.com/wishlist/profiles/${inputValue}/wishlistdata/?p=1`
  ];

  useEffect(() => {
    async function fetchData() {
      await Promise.all(urls.slice(0, 2).map(url => fetch(url)
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

  useEffect(() => {
    async function fetchDataFromId() {
      await Promise.all(urls.slice(2).map(url => fetch(url)
        .then(res => res.json())
        //@ts-ignore
        .then(res => setGamesListFromId(prevState => {
          return [
            ...prevState,
            res
          ]
        }))
        .catch(err => console.log(err))
      ))
    }
    async function fetchOwnedGames() {
      const ids = await (
        await fetch('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5812343ABCE3859FA0797A2860BE0411&steamid=76561197996442713&format=json')
      ).json()
      const filteredIds = ids.response.games.map(({ appid }: any) => appid).filter((element: any) => Object.keys(getGamesListFromId).length > 0 && !Object.keys(getGamesListFromId).map(id => !parseInt(id)).includes(element));
      return Promise.all(filteredIds.map(async (appid: any) => {
        await (await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`))
          .json()
          .then(res => setOwnedGames(res))
      }))
    }

    fetchDataFromId()
    fetchOwnedGames();
  }, [inputValue])

  console.log('ownedGames', ownedGames)

  return (
    <>
      <Header className="header" as='h2' icon textAlign='center'>
        <Icon name='play' circular />
        <Header.Content>Comparez vos listfetches de souhaits</Header.Content>
      </Header>

      <Input value={inputValue} onChange={e => setInputValue(e.target.value)} icon='users' iconPosition='left' placeholder="Entrez un ID" />
    </>
  )
}

export default WishlistCompare;
