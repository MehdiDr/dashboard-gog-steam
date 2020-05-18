import React, { useState } from 'react';
import { Table, Image } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';

import './styles/GamesList.css';

const GamesList = ({ steamGamesInfosArray, gogGamesInfosArray }) => {
  const [gamesInfosTest, setGamesInfos] = useState([]);
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);

  const gamesInfos = Object.values(steamGamesInfosArray)

  const handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setDirection('ascending');
      setColumn(clickedColumn)
      setGamesInfos(_.sortBy(gamesInfos, [clickedColumn]))
      return
    }
      setGamesInfos(gamesInfosTest.reverse());
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
  }

  let hltbService = new HowLongToBeatService();
  // FAIRE UNE REGEX POUR MATCHER LE NOM DU JEU
  // HELP PLS I WANNA DIE
  // const test = gamesInfos.map(game => hltbService.search(string).then(result => console.log(result)));
  // console.log(test)

  return (
    <Table style={{color: "white"}} basic="very" sortable fixed>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell />
          <Table.HeaderCell className="header-cell" sorted={column === 'name' || column === 'title' && direction} onClick={handleSort('name' || 'title')}>
            Nom
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'release_date' && direction} onClick={handleSort('release_date')}>
            Date de sortie
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'subs[0].price' && direction} onClick={handleSort('subs[0].price')}>
            Prix
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'subs[0].discount_pct' && direction} onClick={handleSort('subs[0].discount_pct')}>
            Reduction
          </Table.HeaderCell>
          <Table.HeaderCell className="header-cell" sorted={column === 'review_desc' && direction} onClick={handleSort('review_desc')}>
            Évaluations
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {(gogGamesInfosArray.length > 0 && gogGamesInfosArray.map((game, index) => {
        if(game?.data?.products.length > 0) {
          const {title, url, rating, releaseDate, price} = game.data.products[0];
          return (
            <Table.Row key={index}>
              <Table.Cell collapsing width={2}>
                <a href={url}>
                  <Image className="capsule" centered circular size="small" src={`http://${game?.images?.logo.slice(2)}`} />
                </a>
              </Table.Cell>
              <Table.Cell width={4}>{title}</Table.Cell>
              <Table.Cell width={4}>{moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString()}</Table.Cell>
              <Table.Cell width={4}>{`${price.amount} ${price.symbol}`}</Table.Cell>
              <Table.Cell width={4}>{`${price.discountPercentage} %`}</Table.Cell>
              <Table.Cell width={4}>{rating}</Table.Cell>
            </Table.Row>
          )
        }
      }))}
      {(gamesInfosTest.length > 0 ? gamesInfosTest : gamesInfos).map(({capsule, name, release_string, subs, review_desc}, index) => (
        <Table.Row key={index}>
          <Table.Cell collapsing width={2}>
            <a href={`https://store.steampowered.com/app/${capsule.match(/\d+/g)}/${name}/`}>
              <Image className="capsule" circular centered  size="small" src={capsule} />
            </a>
          </Table.Cell>
          <Table.Cell width={4}>{name}</Table.Cell>
          <Table.Cell width={4}>{release_string}</Table.Cell>
          <Table.Cell width={4}>{subs[0] && `${(subs[0].price / 100).toFixed(2)} €`}</Table.Cell>
          <Table.Cell width={4}>{subs[0] && `${subs[0].discount_pct} %`}</Table.Cell>
          <Table.Cell>{review_desc}</Table.Cell>
        </Table.Row>
  ))}
      </Table.Body>
    </Table>
)};

export default GamesList;
