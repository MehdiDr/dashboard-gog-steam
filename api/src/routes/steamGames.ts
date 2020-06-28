import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import { getGamesFromWishlist, pErr } from '@shared/functions';

// Init shared
const router = Router();

router.get('/user', async (req: Request, res: Response) => {
  const data = await fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5812343ABCE3859FA0797A2860BE0411&steamids=76561197996442713')
      .then(resp => resp.json())
      .catch(err => pErr(err));

  const { personaname, profileurl, avatarmedium } = data.response.players[0];

  const formattedDataUser = [{
    username: personaname,
    profileUrl: profileurl,
    avatar: avatarmedium,
  }];

  res.send(formattedDataUser);
});

router.get('/wishlist', async (req: Request, res: Response) => {
  const urls = [
    'https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=0',
    'https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=1'
  ];

  const data = await Promise.all(
    urls.map(url => fetch(url)
      .then(resp => resp.json())
      .catch(err => pErr(err))
  ));

  res.send(getGamesFromWishlist(data));
});

router.get('/friends', async (req: Request, res: Response) => {
  const datas = await fetch('http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=5812343ABCE3859FA0797A2860BE0411&steamid=76561197996442713&relationship=friend')
    .then(resp => resp.json())
    .catch(err => pErr(err));

  const formattedDataFriends = await Promise.all(datas.friendslist.friends.map(async (friend: any) => {
    try {
      const resp = await fetch(encodeURI(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5812343ABCE3859FA0797A2860BE0411&steamids=${friend.steamid}`))

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
      pErr(e)
    }
  }));

  res.send(formattedDataFriends);
});

router.get('/friend/:steamid', async (req: Request, res: Response) => {
  const { steamid } = req.params;
  const urls = [
    `https://store.steampowered.com/wishlist/profiles/${steamid}/wishlistdata/?p=0`,
    `https://store.steampowered.com/wishlist/profiles/${steamid}/wishlistdata/?p=1`
  ];

  const data = await Promise.all(
    urls.map(url => fetch(url)
      .then(resp => resp.json())
      .catch(err => pErr(err))
  ));

  res.send(getGamesFromWishlist(data));
});

// router.get('/owned-games', async (req: Request, res: Response) => {
//   const ids = await fetch(encodeURI('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5812343ABCE3859FA0797A2860BE0411&steamid=76561197996442713&format=json'))
//     .then(resp => resp.json())
//     .catch(err => pErr(err))

//   const datas = await Promise.all(ids.response.games.map(async ({appid, playtime_forever}: any) => {
//     try {
//       const resp = await fetch(encodeURI(`https://store.steampowered.com/api/appdetails?appids=${appid}`))
//       const data = await resp.json()

//       console.log(data);

//       const { name, header_image } = data.data
//       return {
//         name,
//         avatar: header_image,
//         playedTime: playtime_forever
//       }
//     } catch(e) {
//       pErr(e)
//     }
//   }))

//   res.send(datas);
// });

// router.post('/friends', (req: Request, res: Response) => {
//   const steamid = req.body.steamId;
//   res.redirect(303, `/api/steam/friend/${steamid}`);
// });

export default router;
