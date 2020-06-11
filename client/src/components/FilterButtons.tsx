import React, { useContext } from 'react'
import { Button, Label, Container } from 'semantic-ui-react'
import { Context } from '../context/Context';

import './styles/Filters.css';

type Game = {
  discount?: number,
  platform?: string
}

const FilterButtons = () => {
  const { setClickButton, gamesListGog, steamGamesList } = useContext(Context);
  const numberOfPromotionsGog: Array<object> = gamesListGog.filter((game: Game) => game?.discount! > 0 && game.platform === 'gog')
  const numberOfPromotionsSteam: Array<object> = steamGamesList.filter((game: Game) => game?.discount! > 0 && game?.platform === 'steam')

  return (
    <Container className="filter-container">
      <Button as='a' onClick={() => setClickButton(1)}>
        Tous
      </Button>
      <Button as='div' labelPosition='left' onClick={() => setClickButton(2)}>
        <Label as='a' basic pointing='right'>
          { gamesListGog.length > 0 ? gamesListGog.length : 'Euh' }
        </Label>
        <Button size='big'>GOG</Button>
      </Button>
      <Button as='div' labelPosition='left'>
        <Label as='a' basic pointing='right'>
          { steamGamesList.length > 0 ? steamGamesList.length : 'Euh' }
        </Label>
        <Button size='big' onClick={() => setClickButton(3)}>Steam</Button>
      </Button>
      <Button as='div' labelPosition='left'>
        <Label as='a' basic pointing='right'>
          { steamGamesList.length > 0 ? numberOfPromotionsGog.length + numberOfPromotionsSteam.length : 'Euh' }
        </Label>
        <Button size='big' onClick={() => setClickButton(4)}>Réductions</Button>
      </Button>
    </Container>
  )
}

export default FilterButtons
