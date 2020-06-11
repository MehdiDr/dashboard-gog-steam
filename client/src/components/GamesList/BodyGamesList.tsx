import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import Img from 'react-cool-img';
import _ from 'lodash';
import moment from 'moment';

import { Context } from '../../context/Context';
import './styles/GamesList.css';

interface Props {
  allGames: Array<Game>,
  gamesInfosSorted: Array<Game>
}

interface Game {
  name: string,
  logo: string,
  releaseDate: number,
  linkToShop: string,
  price: number,
  discount: number,
  reviews: any,
  platform: string,
}

const BodyGamesList = ({ allGames, gamesInfosSorted }: Props) => {
  const { clickedButton, setLoading } = useContext(Context);

  const steamGamesFilter = allGames.filter((game: Game) => game?.platform! === 'steam');
  const gogGamesFilter = allGames.filter((game: Game) => game?.platform! === 'gog');
  const discountGamesFilter = allGames.filter((game: Game) => game?.discount! > 0);

  const allGamesSorted = clickedButton === 1 && (gamesInfosSorted.length > 0 ? gamesInfosSorted : allGames);
  const sortedGamesSteamOrGog = clickedButton === 3 ? steamGamesFilter : gogGamesFilter;
  const sortedGamesByDiscount = clickedButton === 4 && discountGamesFilter;

  return (
    <Table.Body>
      {allGames.length === 0 ?
        <> {setLoading(true)} </> :
        (allGamesSorted || sortedGamesByDiscount || sortedGamesSteamOrGog).map((game, index) => {
          if(!game) return null;
          const { name, logo, releaseDate, linkToShop, price, discount, reviews, platform } = game;
          setLoading(false)

          return (
            <Table.Row textAlign='center' className="table-row" key={index} onClick={() => window.open(linkToShop, '_blank')}>
              <Table.Cell collapsing>
                <Img className="capsule" src={logo} />
              </Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>
                {
                  (moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString()) !== "01 Jan, 1970" ?
                    moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString()
                    : 'Pas annoncé'
                }
              </Table.Cell>
              <Table.Cell className={discount ? 'table-cell-price-discounted' : ''}>
                {price ? `${price} € ${discount ? `(- ${discount} %)` : ''}` : 'Non Défini'}
              </Table.Cell>
              <Table.Cell className='table-cell'>{discount}</Table.Cell>
              <Table.Cell>{reviews}</Table.Cell>
              <Table.Cell>
                <Img
                  className='platform'
                  src={platform ==='steam' ?
                    'http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/steam-icon.png'
                    : 'https://img.utdstc.com/icons/gog-galaxy.png:225'}
                  alt={platform === 'steam' ? 'steam' : 'gog'}
                />
              </Table.Cell>
            </Table.Row>
          )
      })}
    </Table.Body>
)};

export default BodyGamesList;