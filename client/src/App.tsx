import React, { useState } from 'react'
import { Menu, Grid } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ContextProvider } from './context/Context';
import Wishlist from './pages/Wishlist';
import Home from './pages/Home';
import WishlistCompare from './pages/WishlistCompare';
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
  {
    path: "/wishlist-compare",
    main: () => <WishlistCompare />
  },
];


const App = () => {
  const [activeItem, setActiveItem] = useState('home')
  //@ts-ignore
  const handleItemClick = (e: Object, { name }: any) => setActiveItem({ activeItem: name })
  return (
    <Router>
      <ContextProvider>
        <div className="App">
          <Grid height={100}>
            <Grid.Row columns={2}>
              <Grid.Column width={2}>
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
                      active={activeItem === 'Liste de souhaits'}
                      onClick={handleItemClick}
                    />
                  </Link>
                  <Link to="/wishlist-compare">
                    <Menu.Item
                      className="menu-item"
                      name='Comparez des wishlist'
                      active={activeItem === 'wishListCompare'}
                      onClick={handleItemClick}
                    />
                  </Link>
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={14}>
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
      </ContextProvider>
    </Router>
  )
}

export default App
