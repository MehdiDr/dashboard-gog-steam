import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const GameLoader = () => {
  return (
    <Dimmer active style={{position: 'fixed', opacity: '0.8'}}>
      <Loader style={{position: 'fixed'}} size='big'/>
    </Dimmer>
  )
}

export default GameLoader;
