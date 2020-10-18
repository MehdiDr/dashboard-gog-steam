import React, { useContext } from 'react';
import { Button, Card, Image, Flag, FlagProps } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/fr'

import { Context } from '../context/Context';
import ScrollArrow from '../components/BackToTop';
import './styles/Friends.css';


interface Props {
  country: FlagProps,
  username: string,
  avatar: string,
  profileUrl: string,
  steamId: number,
  lastLog: number,
  joined: number
}

const Friends = () => {
  const { steamFriendsList, setLoading } = useContext(Context);

  moment.locale('fr');

  const postSteamFriendId = (steamId: number) => fetch("/api/steam/friends", {
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

  return (
    <div className='container-friends'>
      <div className="container-card">
        {steamFriendsList.length === 0 ?
          <>{setLoading(true)}</> :
          steamFriendsList.map(({username, avatar, profileUrl, country, steamId, lastLog, joined}: Props, index: number) => {
            setLoading(false);
            return (
              <Card key={index} className="card">
                <Image src={avatar} size="small" wrapped ui={false} />
                <Card.Content>
                  <Card.Header className='card-header'>
                  <a href={profileUrl}>{username}</a>
                  <Flag name={country?.toLowerCase()} />
                </Card.Header>
                <Card.Meta>
                  <span className='card-content'>
                    {`Dernière connexion ${moment((new Date(lastLog * 1000)),  "YYYYMMDD").fromNow().toString()}`}
                  </span>
                </Card.Meta>
                <Card.Description>
                  <Link to={`friend/${steamId}`}>
                    <Button formAction="" onClick={() => postSteamFriendId(steamId)}>Voir la Liste de souhaits</Button>
                  </Link>
                </Card.Description>
                </Card.Content>
                  <Card.Content className="card-content" extra>
                    {`Inscription ${moment((new Date(joined * 1000)),  "YYYYMMDD").fromNow().toString()}`}
                  </Card.Content>
              </Card>
            )
          })
        }
      </div>
      <ScrollArrow />
    </div>
  )
}

export default Friends;
