import React, { useState } from 'react';
import { Table, Image } from 'semantic-ui-react';
import _ from 'lodash';

const Games = ({ gamesInfos }) => {
  const [gamesInfosTest, setGamesInfos] = useState(gamesInfos);
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);

  const handleSort = (clickedColumn) => () => {
    if (column !== clickedColumn) {
      setDirection('ascending');
      setColumn(clickedColumn)
      setGamesInfos(_.sortBy(gamesInfos, [clickedColumn]))
      return
    }
      setGamesInfos(gamesInfosTest.reverse());
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
  }

  console.log(gamesInfos)

  return (
    <Table sortable fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={handleSort('name')}>
            Nom
          </Table.HeaderCell>
          <Table.HeaderCell sorted={column === 'release_string' ? direction : null} onClick={handleSort('release_string')}>Date de sortie</Table.HeaderCell>
          <Table.HeaderCell >Prix</Table.HeaderCell>
          <Table.HeaderCell sorted={column === 'release_string' ? direction : null} onClick={handleSort('release_string')}>Reduction</Table.HeaderCell>
          <Table.HeaderCell sorted={column === 'review_desc' ? direction : null} onClick={handleSort('review_desc')}>Évaluations</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {gamesInfos && _.map(gamesInfosTest, ({capsule, name, release_string, subs, review_desc}) => (
        <Table.Row negative={review_desc === "aucune évaluation d'utilisateurs"}>
          <Table.Cell collapsing width={2}><Image avatar bordered circular  size="small" src={capsule} /></Table.Cell>
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

export default Games;
