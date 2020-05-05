import React, { useState } from 'react';
import { Header, Icon } from 'semantic-ui-react';

import Games from '../components/Games';
import './Purchases.css';

const Purchases = () => {
  return (
    <>
    <Header className="header" as='h2' icon textAlign='center'>
      <Icon name='play' circular />
      <Header.Content>Liste de souhaits</Header.Content>
    </Header>
    <Games />
  </>
  )
}

export default Purchases;
