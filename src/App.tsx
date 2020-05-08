import React, { useState } from 'react'
import { Menu, Grid } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Wishlist from './pages/Wishlist';
import Home from './pages/Home';
import './App.css'

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />
  },
  {
    path: "/wishlist",
    main: () => <Wishlist />
  },
];


const App = () => {
  const [activeItem, setActiveItem] = useState('home')
  //@ts-ignore
  const handleItemClick = (e: Object, { name }: any) => setActiveItem({ activeItem: name })
  return (
    <Router>
      <div className="App">
        <Grid height={100}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu inverted vertical fixed="left">
                <Link to="/">
                  <Menu.Item
                  className="menu-item"
                  name='Home'
                  active={activeItem === 'home'}
                  onClick={handleItemClick}
                />
                </Link>
                <Link to="/wishlist">
                  <Menu.Item
                  className="menu-item"
                  name='Liste de souhaits'
                  active={activeItem === 'wishlist'}
                  onClick={handleItemClick}
                />
                </Link>
                <Menu.Item
                  className="menu-item"
                  name='La thune'
                  active={activeItem === 'money'}
                  onClick={handleItemClick}
                />
              </Menu>
            </Grid.Column>

            <Grid.Column width={10}>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                  />
                ))}
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Router>
  )
}

export default App
