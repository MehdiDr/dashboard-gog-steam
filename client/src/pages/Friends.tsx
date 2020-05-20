import React, { useState, useEffect, useContext } from 'react';
import { Header, Button, Icon, Card, Image, Flag, FlagProps } from 'semantic-ui-react';
import _ from 'lodash';
import {
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import moment from 'moment';
import 'moment/locale/fr'

import { fetchSteamFriends } from '../components/Datas';
import { Context } from '../context/Context';
import FriendWishlist from './FriendWishlist';
import ScrollArrow from '../components/BackToTop';
import './styles/Friends.css';

interface Props {
  country: FlagProps,
  username: string,
  avatar: string,
  profileUrl: string,
  steamId: number,
  lastLog: number

}

const Friends = () => {
  let { path } = useRouteMatch();

  const [steamFriendsList, setSteamFriendsList] = useState([]);
  const { setLoading } = useContext(Context);

  // const [gamesListFromId, setGamesListFromId] = useState([]);
  // const [inputValue, setInputValue] = useState("")
  // const [ownedGames, setOwnedGames] = useState([]);

  moment.locale('fr');

  useEffect(() => {
    async function getAllDatas() {
      setSteamFriendsList(await fetchSteamFriends())
    }
    getAllDatas()
  }, [])

  const postSteamId = (steamId: number) => fetch("/api/steam/friends", {
        method: 'POST',
        body: JSON.stringify({
          "steamId": steamId,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(err => console.log(err));

  //   async function fetchOwnedGames() {
  //     const ids = await (
  //       await fetch('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5812343ABCE3859FA0797A2860BE0411&steamid=76561197996442713&format=json')
  //     ).json()
  //     const filteredIds = ids.response.games.map(({ appid }: any) => appid).filter((element: any) => Object.keys(getGamesListFromId).length > 0 && !Object.keys(getGamesListFromId).map(id => !parseInt(id)).includes(element));
  //     return Promise.all(filteredIds.map(async (appid: any) => {
  //       await (await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`))
  //         .json()
  //         .then(res => setOwnedGames(res))
  //     }))
  //   }

  //   fetchDataFromId()
  //   fetchOwnedGames();
  // }, [inputValue])

  return (
    <div className='container-friends'>
      <Header className="header" as='h2' icon textAlign='center'>
        <Icon name='play' circular />
        <Header.Content>Liste d'amis</Header.Content>
      </Header>
    <div className="container-card">
    //@ts-ignore
    {steamFriendsList.length === 0 ? setLoading(true) : steamFriendsList.map(({username, avatar, profileUrl, country, steamId, lastLog}: Props, index: number) => {
      setLoading(false);
      return (
      <Card key={index} className="card">
      <Card.Content>
      <div className='card-header' style={{display: 'flex'}}>
        <Image src={avatar} circular wrapped ui={false} />
        <a href={profileUrl}><Card.Header>{username}</Card.Header></a>
        <Flag name={country && country.toLowerCase()} />
        </div>

        <Card.Meta>
          <p className='card-content'>{`Dernière connexion ${moment((new Date(lastLog * 1000)),  "YYYYMMDD").fromNow().toString()}`}</p>
          <Link to={`friend/${steamId}`}>
            <Button formAction="" onClick={() => postSteamId(steamId)} className='card-content'>Voir la Liste de souhaits</Button>
          </Link>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
          <p className='card-content'>{`Steam Id : ${steamId}`}</p>
      </Card.Content>

    </Card>
    )})}
    </div>
    <ScrollArrow />
    </div>
  )
}

export default Friends;
