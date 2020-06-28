import React, { useState, useEffect, useCallback } from 'react';
import GameLoader from '../components/Loader';
import { FlagProps } from 'semantic-ui-react';

import { fetchGogWithlist, fetchSteamWishlist, fetchSteamUser, fetchGogUser, fetchSteamFriends } from '../components/Datas';


export interface ContextProps {
  steamGamesList: Array<{
    name: string,
    logo: string,
    releaseDate: number,
    linkToShop: string,
    price: number,
    discount: number,
    reviews: any,
    platform: string,
  }>;
  steamFriendsList: Array<{
    country: FlagProps,
    username: string,
    avatar: string,
    profileUrl: string,
    steamId: number,
    lastLog: number,
    joined: number
  }>;
  steamFriendGamesList: object[];
  setSteamFriendGamesList: (data: any) => void;
  gamesListGog: object[];
  clickedButton: number;
  setClickButton: (e: number) => void;
  isLoading: boolean;
  setLoading: (loading:boolean) => void;
  steamUserInfos: Array<{
    username?: string,
    avatar?: string,
    profileUrl?: string
  }>;
  gogUserInfos: Array<{
    username?: string,
    avatar?: string,
    profileUrl?: string
  }>;
}

const Context = React.createContext({} as ContextProps);

const ContextProvider = (props:any) => {
  const [steamGamesList, setSteamGamesList] = useState([]);
  const [steamFriendsList, setSteamFriendsList] = useState([]);
  const [steamFriendGamesList, setSteamFriendGamesList] = useState([]);
  const [gamesListGog, setGamesListGog] = useState([]);
  const [clickedButton, setClickButton] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [steamUserInfos, setSteamUserInfos] = useState([]);
  const [gogUserInfos, setGogUserInfos] = useState([]);

  const getAllDatas = useCallback(async () => {
    setSteamGamesList(await fetchSteamWishlist())
    setGamesListGog(await fetchGogWithlist())
    setSteamUserInfos(await fetchSteamUser())
    setGogUserInfos(await fetchGogUser())
    setSteamFriendsList(await fetchSteamFriends())
  }, [])

  useEffect(() => {
    getAllDatas()
  }, [])

  return (
    <Context.Provider value={{
      steamGamesList,
      steamFriendsList,
      steamFriendGamesList,
      setSteamFriendGamesList,
      gamesListGog,
      clickedButton,
      setClickButton,
      isLoading,
      setLoading,
      steamUserInfos,
      gogUserInfos,
    }}>
      {isLoading && <GameLoader />}
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
