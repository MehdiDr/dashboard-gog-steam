import React, { useState, useContext } from 'react';
import { Table, Image } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';

import { Context } from '../../context/Context';
import './styles/GamesList.css';

const BodyGamesList = ({ allGames }) => {
  const { clickedButton, setLoading } = useContext(Context);
  const [gamesInfosSorted, setGamesInfosSorted] = useState([]);

  const steamGamesFilter = allGames.filter(game => game && game.platform === 'steam');
  const gogGamesFilter = allGames.filter(game => game && game.platform === 'gog');
  const discountGamesFilter = allGames.filter(game => game && game.discount > 0);

  const allGamesSorted = clickedButton === 1 && (gamesInfosSorted.length > 0 ? gamesInfosSorted : allGames);
  const sortedGamesSteamOrGog = clickedButton === 3 ? steamGamesFilter : gogGamesFilter;
  const sortedGamesByDiscount = clickedButton === 4 && discountGamesFilter;

  return (
    <Table.Body>
    {allGames.length === 0 ? setLoading(true) :
      (allGamesSorted || sortedGamesSteamOrGog || sortedGamesByDiscount).map((game, index) => {
        if(!game) return null;
        const { name, logo, releaseDate, linkToShop, price, discount, reviews, platform } = game;
        setLoading(false)

        return (
          <Table.Row className="table-row" key={index} onClick={() => window.open(linkToShop, '_blank')}>
            <Table.Cell collapsing width={2}>
              <Image className="capsule" circular centered size="small" src={logo} />
            </Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>
              {
                (moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString()) !== "01 Jan, 1970" ?
                  moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString()
                  : 'Pas annoncé'
              }
            </Table.Cell>
            <Table.Cell>{price ? `${price} €` : 'Non Défini'}</Table.Cell>
            <Table.Cell>{discount ? `${discount} %` : '0 %'}</Table.Cell>
            <Table.Cell>{reviews}</Table.Cell>
            <Table.Cell>
              <Image
                size='mini'
                src={platform ==='steam' ?
                  'http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/steam-icon.png'
                  : 'https://img.utdstc.com/icons/gog-galaxy.png:225'} />
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
)};

export default BodyGamesList;
