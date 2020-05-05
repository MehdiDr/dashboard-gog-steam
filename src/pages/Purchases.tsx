import React, { useState } from 'react';
import { Header, Icon } from 'semantic-ui-react';

import GamesList from '../components/GamesList';
import './styles/Purchases.css';

const Purchases = () => {
  return (
    <>
    <Header className="header" as='h2' icon textAlign='center'>
      <Icon name='play' circular />
      <Header.Content>Liste de souhaits</Header.Content>
    </Header>
    <GamesList />
  </>
  )
}

export default Purchases;
