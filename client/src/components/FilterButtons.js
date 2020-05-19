import React, { useContext } from 'react'
import { Button } from 'semantic-ui-react'
import { Context } from '../context/Context';

const FilterButtons = () => {
  const { setClickButton } = useContext(Context);
  return (
    <Button.Group>
      <Button size="big" onClick={() => setClickButton(1)}>Tous</Button>
      <Button.Or />
      <Button size="big" onClick={() => setClickButton(2)}>GOG</Button>
      <Button.Or />
      <Button size="big" onClick={() => setClickButton(3)}>Steam</Button>
    </Button.Group>
  )
}

export default FilterButtons
