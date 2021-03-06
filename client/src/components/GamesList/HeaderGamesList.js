import React, { useState, useMemo } from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

import './styles/GamesList.css';

const HeaderGamesList = ({ allGames, gamesInfosSorted, setGamesInfosSorted }) => {
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);
  const gamesAttributes = ['name', 'releaseDate', 'price', 'reviews', 'platform'];

  const list = useMemo(() => gamesAttributes.map((attribute, index) => {
    const handleSort = clickedColumn => () => {
      if (column !== clickedColumn) {
        setDirection('ascending');
        setColumn(clickedColumn)
        setGamesInfosSorted(_.sortBy(allGames, [clickedColumn]))
        return
      }
        setGamesInfosSorted(gamesInfosSorted.reverse());
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    }

    return (
      <Table.HeaderCell key={index}  textAlign='center' className="header-cell" sorted={column === attribute ? direction : null} onClick={handleSort(attribute)}>
        {
          (attribute === 'name' && 'Nom') ||
          (attribute === 'releaseDate' && 'Date de sortie') ||
          (attribute === 'price' && 'Prix') ||
          (attribute === 'platform' && 'Plateforme') ||
          (attribute === 'reviews' && 'Avis')
        }
      </Table.HeaderCell>
    )}), [gamesAttributes, column, direction, allGames, gamesInfosSorted, setGamesInfosSorted])

  return (
    <Table.Header>
      <Table.HeaderCell textAlign='center' />
      {list}
    </Table.Header>
)};

export default HeaderGamesList;
