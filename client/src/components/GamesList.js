import React, { useState, useContext } from 'react';
import { Table, Image } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';

import { Context } from '../context/Context';
import './styles/GamesList.css';

const GamesList = ({ steamGamesInfosArray, gogGamesInfosArray }) => {
  const { clickedButton } = useContext(Context);
  const [gamesInfosSorted, setGamesInfosSorted] = useState([]);
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);

  const allGames = [...steamGamesInfosArray, ...gogGamesInfosArray];
  const steamGamesFilter = allGames.filter(game => game && game.platform === 'steam');
  const gogGamesFilter = allGames.filter(game => game && game.platform === 'gog');

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
    <Table style={{color: "white"}} basic="very" sortable fixed>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell />
          <Table.HeaderCell className="header-cell" sorted={column === 'name' ? direction : null} onClick={handleSort('name')}>
            Nom
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'releaseDate' ? direction : null} onClick={handleSort('releaseDate')}>
            Date de sortie
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'price' ? direction : null} onClick={handleSort('price')}>
            Prix
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'discount' ? direction : null} onClick={handleSort('discount')}>
            Reduction
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'reviews' ? direction : null} onClick={handleSort('reviews')}>
            Évaluations
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'platform' ? direction : null} onClick={handleSort('platform')}>
            Plateforme
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {
        (clickedButton === 1 && (gamesInfosSorted.length > 0 ? gamesInfosSorted : allGames) ||
          clickedButton === 2 && gogGamesFilter ||
          clickedButton === 3 && steamGamesFilter).map((game, index) => {
          if(!game) return null;
          const {name, logo, releaseDate, linkToShop, price, discount, reviews, platform} = game;
          return (
            <Table.Row key={index}>
              <Table.Cell collapsing width={2}>
                <Image
                  onClick={() => window.open(linkToShop, '_blank')}
                  className="capsule"
                  circular
                  centered
                  size="small"
                  src={logo}
                />
              </Table.Cell>
              <Table.Cell width={4}>{name}</Table.Cell>
              <Table.Cell width={4}>
                {(moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString()) !== "01 Jan, 1970" ? moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString(): 'Pas annoncé'}
              </Table.Cell>
              <Table.Cell width={4}>{price ? `${price} €` : 'Non Défini'}</Table.Cell>
              <Table.Cell width={4}>{discount ? `${discount} %` : '0 %'}</Table.Cell>
              <Table.Cell>{reviews}</Table.Cell>
              <Table.Cell width={4}>{platform}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
)};

export default GamesList;
