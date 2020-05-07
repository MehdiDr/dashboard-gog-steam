import React, { useState } from 'react';
import { Table, Image } from 'semantic-ui-react';
import _ from 'lodash';
import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';

import './styles/GamesList.css';

const GamesList = ({ gamesInfosArray }) => {
  const [gamesInfosTest, setGamesInfos] = useState([]);
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);

  const gamesInfos = Object.values(gamesInfosArray[0])

  console.log()

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
  hltbService.search("").then(result => result.map(game => <Table.Cell width={4}>{game.gameplayMain}</Table.Cell>))

  return (
    <Table style={{color: "white"}} basic="very" sortable fixed>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell />
          <Table.HeaderCell className="header-cell" sorted={column === 'name' && direction} onClick={handleSort('name')}>
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
      {(gamesInfosTest.length > 0 ? gamesInfosTest : gamesInfos).map(({capsule, name, release_string, subs, review_desc}, index) => (
        <Table.Row key={index}>
          <Table.Cell collapsing width={2}><Image className="capsule" circular centered  size="small" src={capsule} /></Table.Cell>
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
