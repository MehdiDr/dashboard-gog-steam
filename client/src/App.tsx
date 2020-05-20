import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ContextProvider } from './context/Context';
import Menu from './components/Menu';
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
          <Menu />

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
