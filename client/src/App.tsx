import React from 'react'
import { Menu, Icon } from 'semantic-ui-react';
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
  return (
    <Router>
      <ContextProvider>
        <div className="App">
          <div className="menu-sidebar">
            <div className='menu-buttons'>
              <Link to="/">
                <Icon className="menu-item" name='home' size='big'
                />
              </Link>

            <div>
              <Link to="/wishlist">
                <span>Liste de souhaits</span>
              </Link>
            </div>
            <div>
              <Link to="/wishlist-compare">
                <span>Amis</span>
              </Link>
            </div>
            </div>
          </div>

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
        </div>
      </ContextProvider>
    </Router>
  )
}

export default App
