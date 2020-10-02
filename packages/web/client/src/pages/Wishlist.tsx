import React, { useContext } from 'react';
import { Header, Icon } from 'semantic-ui-react';

import GamesList from '../components/GamesList/GamesList';
import FilterButtons from '../components/FilterButtons';
import { Context } from '../context/Context';
import './styles/Wishlist.css';

const Wishlist = () => {
  const { steamGamesList, gamesListGog } = useContext(Context);

  const allGames= steamGamesList && gamesListGog && [...steamGamesList, ...gamesListGog]

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
