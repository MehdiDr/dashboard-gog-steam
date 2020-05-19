import React, { useState } from 'react';

interface ContextProps {
  steamGamesList: object[];
  setSteamGamesList: (data: any) => void;
  gamesListGog: object[];
  setGamesListGog: (data: any) => void;
  clickedButton: number;
  setClickButton: (e: number) => void;
}

const Context = React.createContext({} as ContextProps);

const ContextProvider = (props:any) => {
  const [steamGamesList, setSteamGamesList] = useState([]);
  const [gamesListGog, setGamesListGog] = useState([]);
  const [clickedButton, setClickButton] = useState(1);

  return (
    <Context.Provider value={{
      steamGamesList,
      //@ts-ignore
      setSteamGamesList,
      gamesListGog,
      //@ts-ignore
      setGamesListGog,
      clickedButton,
      //@ts-ignore
      setClickButton,
    }}>
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
