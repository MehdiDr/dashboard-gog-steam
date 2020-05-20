import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';

import ScrollArrow from '../BackToTop';
import HeaderGamesList from './HeaderGamesList';
import BodyGamesList from './BodyGamesList';

import './styles/GamesList.css';

const GamesList = ({ allGames }) => {
  const [gamesInfosSorted, setGamesInfosSorted] = useState([]);
  return (
    <Table className="table" basic="very" sortable fixed>
      <HeaderGamesList gamesInfosSorted={gamesInfosSorted} setGamesInfosSorted={setGamesInfosSorted} allGames={allGames}/>
      <BodyGamesList gamesInfosSorted={gamesInfosSorted} allGames={allGames}/>
      <ScrollArrow />
    </Table>
)};

export default GamesList;
