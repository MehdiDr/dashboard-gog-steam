import React from 'react';
import { Table } from 'semantic-ui-react';

import ScrollArrow from '../BackToTop';
import HeaderGamesList from './HeaderGamesList';
import BodyGamesList from './BodyGamesList';

import './styles/GamesList.css';

const GamesList = ({ allGames }) => {
  return (
    <Table className="table" basic="very" sortable fixed>
      <HeaderGamesList allGames={allGames}/>
      <BodyGamesList allGames={allGames}/>
      <ScrollArrow />
    </Table>
)};

export default GamesList;
