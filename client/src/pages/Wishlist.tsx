import React, { useContext } from 'react';

import GamesList from '../components/GamesList/GamesList';
import FilterButtons from '../components/FilterButtons';
import { Context } from '../context/Context';
import './styles/Wishlist.css';

const Wishlist = () => {
  const { gamesWishlist } = useContext(Context);

  return (
    <>
      <FilterButtons />
      <GamesList allGames={gamesWishlist} />
    </>
  )
}

export default Wishlist;
