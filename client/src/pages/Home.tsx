import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { Button, Input } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const postSteamId = (steamId: string) => fetch(`http://localhost:9000/api/games/wishlist`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "steamId": steamId,
  }),
})
.then(res => res.json())
.then(err => console.log(err));

// TODO: Get the URL parameter to have steamId insteand of hardcode it?
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const product = urlParams.get('steamId')
// console.log('url params', product);

// steamId= 76561197996442713
const Home = () => {
  const { userSteamId, setUserSteamId } = useContext(Context);
  return (
    <>
    <div>
      <p>Bienvenue sur le dashboard qui mélange Steam et Gog !</p>
      <p>Grâce à cet outil, vous serez en mesure de mélanger vos listes de souhaits, ainsi que les trier selon plusieurs critères.</p>
      <Input name="steamId" id="steamId" onChange={event => setUserSteamId(event.target.value)} />
      <Link to={`/wishlist`}>
        <Button size="small" onClick={() => postSteamId(userSteamId)}> Cliquez ici pour vous connecter à Steam </Button>
      </Link>
     </div>
    </>
  )
}

export default Home;
