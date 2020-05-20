import React, { useState } from 'react';
import GameLoader from '../components/Loader';

interface ContextProps {
  steamGamesList: object[];
  setSteamGamesList: (data: any) => void;
  gamesListGog: object[];
  setGamesListGog: (data: any) => void;
  clickedButton: number;
  setClickButton: (e: number) => void;
  isLoading: boolean;
  setLoading: (loading:boolean) => void;
}

const Context = React.createContext({} as ContextProps);

const ContextProvider = (props:any) => {
  const [steamGamesList, setSteamGamesList] = useState([]);
  const [gamesListGog, setGamesListGog] = useState([]);
  const [clickedButton, setClickButton] = useState(1);
  const [isLoading, setLoading] = useState(false);

  return (
    <Context.Provider value={{
      steamGamesList,
      setSteamGamesList,
      gamesListGog,
      setGamesListGog,
      clickedButton,
      setClickButton,
      isLoading,
      setLoading
    }}>
    {isLoading && <GameLoader />}
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
