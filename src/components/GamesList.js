import React, { useState, useEffect } from 'react';
import { Table, Image } from 'semantic-ui-react';
import * as moment from 'moment'; // UNINSTALL MAYBE

const Games = () => {
  const [gamesList, setGamesList] = useState([]);

  const fetchData = async () => {
    const urls = [
      "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=0",
      "https://cors-anywhere.herokuapp.com/https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=1"
    ]

    await Promise.all(urls.map(url => fetch(url)
      .then(res => res.json())
      .then(res => setGamesList(res))
      .catch(err => err)
    ))
  };

  useEffect(() => fetchData(), [])

  console.log(Object.values(gamesList))

  return (
    <Table basic='very' columns="6">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Nom</Table.HeaderCell>
          <Table.HeaderCell>Date de sortie</Table.HeaderCell>
          <Table.HeaderCell>Prix</Table.HeaderCell>
          <Table.HeaderCell>Reduction</Table.HeaderCell>
          <Table.HeaderCell>Évaluations</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {gamesList && Object.values(gamesList).map((game, index) => {
        return (
        <Table.Row key={index}>
          <Table.Cell collapsing width={2}><Image avatar bordered circular  size="small" src={game.capsule} /></Table.Cell>
          <Table.Cell width={4}>{game.name}</Table.Cell>
          <Table.Cell width={4}>{game.release_string}</Table.Cell>
          <Table.Cell width={4}>{game.subs[0] && `${(game.subs[0].price / 100).toFixed(2)} €`}</Table.Cell>
          <Table.Cell width={4}>{game.subs[0] && `${game.subs[0].discount_pct} %`}</Table.Cell>
          <Table.Cell>{game.review_desc}</Table.Cell>
        </Table.Row>
        )})}
      </Table.Body>
    </Table>
)};

export default Games;
