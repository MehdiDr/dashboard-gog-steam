import React, { useState, useMemo } from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

import './styles/GamesList.css';

const HeaderGamesList = ({ allGames }) => {
  const [gamesInfosSorted, setGamesInfosSorted] = useState([]);
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);
  const gamesAttributes = ['name', 'releaseDate', 'price', 'reviews', 'platform'];

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

  const list = useMemo(() => gamesAttributes.map((attribute, index) => (
    <Table.HeaderCell key={index} className="header-cell" sorted={column === attribute ? direction : null} onClick={handleSort(attribute)}>
      {
        (attribute === 'name' && 'Nom') ||
        (attribute === 'releaseDate' && 'Date de sortie') ||
        (attribute === 'price' && 'Prix') ||
        (attribute === 'platform' && 'Plateforme') ||
        (attribute === 'reviews' && 'Avis')
      }
    </Table.HeaderCell>
  )), [gamesAttributes])

  return (
      <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell />
          {list}
        </Table.Row>
      </Table.Header>
)};

export default HeaderGamesList;
