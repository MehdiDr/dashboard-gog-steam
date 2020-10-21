import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ContextProvider } from './context/Context';
import GameLoader from './components/Loader';
import './App.css'

const Menu = lazy(() => import('./components/Menu'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Home = lazy(() => import('./pages/Home'));
const Friends = lazy(() => import('./pages/Friends'));
const FriendWishlist = lazy(() => import('./pages/FriendWishlist'));

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
    <Suspense fallback={<GameLoader />}>
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
    </Suspense>
  </Router>
  )
}

export default App
