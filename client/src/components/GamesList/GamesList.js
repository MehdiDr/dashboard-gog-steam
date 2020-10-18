import React, { useState, Suspense } from 'react';
import { Table } from 'semantic-ui-react';
import GameLoader from '../Loader';
import './styles/GamesList.css';

const ScrollArrow = React.lazy(() => import('../BackToTop'));
const HeaderGamesList = React.lazy(() => import('./HeaderGamesList'));
const BodyGamesList = React.lazy(() => import('./BodyGamesList'));


const GamesList = ({ allGames }) => {
  const [gamesInfosSorted, setGamesInfosSorted] = useState([]);
  return (
    <Table className="table" basic="very" sortable fixed>
      <Suspense fallback={<GameLoader />}>
        <HeaderGamesList gamesInfosSorted={gamesInfosSorted} setGamesInfosSorted={setGamesInfosSorted} allGames={allGames}/>
        <BodyGamesList gamesInfosSorted={gamesInfosSorted} allGames={allGames}/>
        <ScrollArrow />
      </Suspense>
    </Table>
)};

export default GamesList;
