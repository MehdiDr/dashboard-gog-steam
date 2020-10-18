import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ContextProvider } from './context/Context';
import Menu from './components/Menu';
import Wishlist from './pages/Wishlist';
import Home from './pages/Home';
import Friends from './pages/Friends';
import './App.css'
import FriendWishlist from './pages/FriendWishlist';

const App = () => {
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
      path: "/friends",
      main: () => <Friends />
    },
    {
      path: '/friend/:steamId',
      main: () => <FriendWishlist />
    }
  ];
  const pathname = window.location.pathname

return (
    <Router>
      <ContextProvider>
        <div className="App">
        {pathname !== '/' && <Menu />}

          <Switch>
            {routes.map((route, index) => {
              return <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            })}
          </Switch>
        </div>
      </ContextProvider>
    </Router>
  )
}

export default App
