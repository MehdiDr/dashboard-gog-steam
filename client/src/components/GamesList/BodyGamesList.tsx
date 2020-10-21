import React, { useContext, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Table } from 'semantic-ui-react';
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

const BodyGamesList = memo(({ allGames, gamesInfosSorted }: Props) => {
  const { clickedButton } = useContext(Context);

  const steamGamesFilter = allGames.filter((game: Game) => game?.platform! === 'steam');
  const gogGamesFilter = allGames.filter((game: Game) => game?.platform! === 'gog');
  const discountGamesFilter = allGames.filter((game: Game) => game?.discount! > 0);

  const allGamesSorted = clickedButton === 1 && (gamesInfosSorted.length > 0 ? gamesInfosSorted : allGames);
  const sortedGamesSteamOrGog = clickedButton === 3 ? steamGamesFilter : gogGamesFilter;
  const sortedGamesByDiscount = clickedButton === 4 && discountGamesFilter;

  return (
    <Table.Body>
      {
        (allGamesSorted || sortedGamesByDiscount || sortedGamesSteamOrGog).map((game, index) => {
          if(!game) return null;
          const { name, logo, releaseDate, linkToShop, price, discount, reviews, platform } = game;

          return (
            <Table.Row textAlign='center' className="table-row" key={index} onClick={() => window.open(linkToShop, '_blank')}>
              <Table.Cell collapsing>
                <LazyLoadImage alt={name} src={logo} threshold={100} className='capsule' effect='blur' />
              </Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>
                {
                  !!releaseDate && (moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString()) !== "01 Jan, 1970" && releaseDate !== null ?
                    moment((new Date(releaseDate * 1000))).format('DD MMM, YYYY').toString()
                    : '-'
                }
              </Table.Cell>
              <Table.Cell className={discount ? 'table-cell-price-discounted' : ''}>
                {price && price !== 83.99 && price !== 99.99 ? `${price} € ${discount ? `(- ${discount} %)` : ''}` : '-'}
              </Table.Cell>
              <Table.Cell className='table-cell'>{discount}</Table.Cell>
              <Table.Cell>{reviews}</Table.Cell>
              <Table.Cell>
                <img
                  className='platform'
                  src={platform ==='steam' ?
                    'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/steam-icon.png'
                    : 'https://cdn.discordapp.com/attachments/260251901520642048/764216742305333248/hiclipart.com.png'}
                  alt={platform === 'steam' ? 'steam' : 'gog'}
                />
              </Table.Cell>
            </Table.Row>
          )
      })}
    </Table.Body>
)});

export default BodyGamesList;
