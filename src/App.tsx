import React from 'react';
import { Grid } from 'semantic-ui-react'

import MenuExampleInvertedVertical from './components/Sidebar.js';
import Purchases from './pages/Purchases';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Grid height={100}>
        <Grid.Row>
          <Grid.Column width={4}>
            <MenuExampleInvertedVertical />
          </Grid.Column>
          <Grid.Column width={10}>
            <Purchases />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
