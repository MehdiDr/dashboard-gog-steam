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
  steamUserInfos: object;
  setSteamUserInfos: (data: any) => void
  gogUserInfos: object;
  setGogUserInfos: (data: any) => void
}

const Context = React.createContext({} as ContextProps);

const ContextProvider = (props:any) => {
  const [steamGamesList, setSteamGamesList] = useState([]);
  const [gamesListGog, setGamesListGog] = useState([]);
  const [clickedButton, setClickButton] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [steamUserInfos, setSteamUserInfos] = useState({});
  const [gogUserInfos, setGogUserInfos] = useState({});


  return (
    <Context.Provider value={{
      steamGamesList,
      setSteamGamesList,
      gamesListGog,
      setGamesListGog,
      clickedButton,
      setClickButton,
      isLoading,
      setLoading,
      steamUserInfos,
      setSteamUserInfos,
      gogUserInfos,
      setGogUserInfos
    }}>
    {isLoading && <GameLoader />}
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
