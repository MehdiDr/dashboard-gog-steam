import React, { useState, useEffect, useCallback } from 'react';
import { FlagProps } from 'semantic-ui-react';

import { fetchWishlist, fetchUserInfos, fetchSteamFriends } from '../components/Datas';


export interface ContextProps {
  gamesWishlist: Array<{
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
  clickedButton: number;
  setClickButton: (e: number) => void;
  userInfos: Array<{
    username?: string,
    avatar?: string,
    profileUrl?: string
  }>;
}

const Context = React.createContext({} as ContextProps);

const ContextProvider = (props:any) => {
  const [steamFriendsList, setSteamFriendsList] = useState([]);
  const [steamFriendGamesList, setSteamFriendGamesList] = useState([]);
  const [gamesWishlist, setGamesWishlist] = useState([]);
  const [clickedButton, setClickButton] = useState(1);
  const [userInfos, setUserInfos] = useState([]);

  const getAllDatas = useCallback(async () => {
    setGamesWishlist(await fetchWishlist())
    setUserInfos(await fetchUserInfos())
    setSteamFriendsList(await fetchSteamFriends())
  }, [])

  useEffect(() => {
    getAllDatas()
  }, [])

  return (
    <Context.Provider value={{
      gamesWishlist,
      steamFriendsList,
      steamFriendGamesList,
      setSteamFriendGamesList,
      clickedButton,
      setClickButton,
      userInfos,
    }}>
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
