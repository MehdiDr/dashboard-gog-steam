import React, { useState, useEffect } from 'react';
import { Table, Image } from 'semantic-ui-react';

const Games = () => {
  const [gamesList, setGamesList] = useState([]);

  async function fetchData() {
    await fetch("https://cors-anywhere.herokuapp.com/https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=0")
      .then(res => res.json())
      .then(res => setGamesList(res))
      .catch(err => err)
  }

  useEffect(() => fetchData(), []);

  console.log(Object.values(gamesList))

  return (
    <Table basic='very' columns="2">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Nom</Table.HeaderCell>
          <Table.HeaderCell>Date de sortie</Table.HeaderCell>
          <Table.HeaderCell>Reviews</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {gamesList && Object.values(gamesList).map(game => (
        <Table.Row>
          <Table.Cell collapsing width={2}><Image avatar bordered circular  size="small" src={game.capsule} /></Table.Cell>
          <Table.Cell width={4}>{game.name}</Table.Cell>
          <Table.Cell>{game.release_string}</Table.Cell>
          <Table.Cell>{game.review_desc}</Table.Cell>
        </Table.Row>
        ))}
      </Table.Body>
    </Table>
)};

export default Games;
