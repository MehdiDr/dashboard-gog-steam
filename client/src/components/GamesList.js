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

  const gamesInfos = Object.values(steamGamesInfosArray)

  const handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setDirection('ascending');
      setColumn(clickedColumn)
      setGamesInfosSorted(_.sortBy(gamesInfos, [clickedColumn]))
      return
    }
      setGamesInfosSorted(gamesInfos.reverse());
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
          <Table.HeaderCell className="header-cell" sorted={column === 'release_date' ? direction : null} onClick={handleSort('release_date')}>
            Date de sortie
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'subs[0].price' ? direction : null} onClick={handleSort('subs[0].price')}>
            Prix
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'subs[0].discount_pct' ? direction : null} onClick={handleSort('subs[0].discount_pct')}>
            Reduction
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'review_desc' ? direction : null} onClick={handleSort('review_desc')}>
            Évaluations
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'review_desc' ? direction : null} onClick={handleSort('review_desc')}>
            Plateforme
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {
        clickedButton === 1 || clickedButton === 2 &&
        gogGamesInfosArray.length > 0 && gogGamesInfosArray.map((game, index) => {
        if(game?.data?.products.length > 0) {
          const {title, url, rating, releaseDate, price} = game.data.products[0];
          return (
            <Table.Row key={index}>
              <Table.Cell collapsing width={2}>
                <Image
                  className="capsule"
                  onClick={() => window.open(`https://gog.com/${url}`, '_blank')}
                  centered
                  circular
                  size="small"
                  src={`http://${game?.images?.logo.slice(2)}`}
                />
              </Table.Cell>
              <Table.Cell width={4}>{title}</Table.Cell>
              <Table.Cell width={4}>{moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString()}</Table.Cell>
              <Table.Cell width={4}>{`${price.amount} ${price.symbol}`}</Table.Cell>
              <Table.Cell width={4}>{`${price.discountPercentage} %`}</Table.Cell>
              <Table.Cell width={4}>{rating}</Table.Cell>
              <Table.Cell width={4}>Gog</Table.Cell>
            </Table.Row>
          )
        }
      })}
      {
        clickedButton === 1 || clickedButton === 3 &&
        (gamesInfosSorted.length > 0 ? gamesInfosSorted : gamesInfos).map(({capsule, name, release_string, subs, review_desc}, index) => (
        <Table.Row key={index}>
          <Table.Cell collapsing width={2}>
              <Image
                onClick={() => window.open(`https://store.steampowered.com/app/${capsule.match(/\d+/g)}/${name}/`, '_blank')}
                className="capsule"
                circular
                centered
                size="small"
                src={capsule}
              />
          </Table.Cell>
          <Table.Cell width={4}>{name}</Table.Cell>
          <Table.Cell width={4}>{release_string}</Table.Cell>
          <Table.Cell width={4}>{subs[0] && `${(subs[0].price / 100).toFixed(2)} €`}</Table.Cell>
          <Table.Cell width={4}>{subs[0] && `${subs[0].discount_pct} %`}</Table.Cell>
          <Table.Cell>{review_desc}</Table.Cell>
          <Table.Cell width={4}>Steam</Table.Cell>
        </Table.Row>
  ))}
      </Table.Body>
    </Table>
)};

export default GamesList;
