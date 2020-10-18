import React, { useContext } from 'react';

import GamesList from '../components/GamesList/GamesList';
import FilterButtons from '../components/FilterButtons';
import { Context } from '../context/Context';
import './styles/Wishlist.css';

const Wishlist = () => {
  const { steamGamesList, gamesListGog } = useContext(Context);

  const allGames= steamGamesList && gamesListGog && [...steamGamesList, ...gamesListGog]

  return (
    <>
      <FilterButtons />
      <GamesList allGames={allGames} />
    </>
  )
}

export default Wishlist;
