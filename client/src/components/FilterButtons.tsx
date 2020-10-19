import React, { useContext } from 'react'
import { Button, Label, Container, Loader } from 'semantic-ui-react'
import { Context } from '../context/Context';

import './styles/Filters.css';

type Game = {
  discount?: number,
  platform?: string
}

const FilterButtons = () => {
  const { setClickButton, gamesWishlist } = useContext(Context);
  const steamGames = gamesWishlist.filter(game => game?.platform! === 'steam')
  const gogGames = gamesWishlist.filter(game => game?.platform! === 'gog')
  const numberOfPromotionsGog: Array<object> = gamesWishlist.filter((game: Game) => game?.discount! > 0 && game.platform === 'gog')
  const numberOfPromotionsSteam: Array<object> = gamesWishlist.filter((game: Game) => game?.discount! > 0 && game?.platform === 'steam')

  return (
    <Container className="filter-container">
      <Button as='a' onClick={() => setClickButton(1)}>Tous</Button>
      <Button as='div' labelPosition='left' onClick={() => setClickButton(2)}>
        <Label as='a' basic pointing='right'>
          { gogGames.length === 0 ? <Loader active className='workaround' size='small' inline='centered'/> : gogGames.length }
        </Label>
        <Button size='big'>GOG</Button>
      </Button>
      <Button as='div' labelPosition='left'>
        <Label as='a' basic pointing='right'>
          { steamGames.length === 0 ? <Loader active className='workaround' size='small' inline='centered'/> : steamGames.length }
        </Label>
        <Button size='big' onClick={() => setClickButton(3)}>Steam</Button>
      </Button>
      <Button as='div' labelPosition='left'>
        <Label as='a' basic pointing='right'>
          {
            gamesWishlist.length === 0 ?
            <Loader active className='workaround' size='small' inline='centered'/> :
            numberOfPromotionsGog.length + numberOfPromotionsSteam.length
          }
        </Label>
        <Button size='big' onClick={() => setClickButton(4)}>Réductions</Button>
      </Button>
    </Container>
  )
}

export default FilterButtons
