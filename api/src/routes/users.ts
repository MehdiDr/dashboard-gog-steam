import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';

// Init shared
const router = Router();

router.get('/user', async (req: Request, res: Response) => {
  const dataGog = await fetch('https://embed.gog.com/users/info/48800609011490?expand=friendStatus,wishlistStatus,blockedStatus')
  .then(resp => resp.json())
  .catch(err => console.log(err));
  const dataSteam = await fetch('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5812343ABCE3859FA0797A2860BE0411&steamids=76561197996442713')
      .then(resp => resp.json())
      .catch(err => console.log(err));


  const { personaname, profileurl, avatarmedium } = dataSteam.response.players[0];

  const formattedDataUser = [
    {
      username: dataGog.username,
      avatar: dataGog.avatars.medium,
      profileUrl: 'https://www.gog.com/feed'
    },
    {
      username: personaname,
      profileUrl: profileurl,
      avatar: avatarmedium,
    }
  ]

  res.send(formattedDataUser);
});

router.get('/friends', async (req: Request, res: Response) => {
  const datas = await fetch('https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=5812343ABCE3859FA0797A2860BE0411&steamid=76561197996442713&relationship=friend')
    .then(resp => resp.json())
    .catch(err => console.log(err));

  const formattedDataFriends = await Promise.all(datas.friendslist.friends.map(async (friend: any) => {
    try {
      const resp = await fetch(encodeURI(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5812343ABCE3859FA0797A2860BE0411&steamids=${friend.steamid}`))

      const data = await resp.json();
      const { personaname, avatarfull, lastlogoff, loccountrycode, profileurl, steamid, timecreated } = data.response.players[0]
      return {
        username: personaname,
        avatar: avatarfull,
        lastLog: lastlogoff,
        joined: timecreated,
        country: loccountrycode,
        profileUrl: profileurl,
        steamId: steamid
      }
    } catch(e) {
      console.log(e)
    }
  }));

  res.send(formattedDataFriends);
});

export default router;
