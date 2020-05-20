import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';

// Init shared
const router = Router();

router.get('/user', async (req: Request, res: Response) => {
  const data = await fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5812343ABCE3859FA0797A2860BE0411&steamids=76561197996442713')
      .then((resp) => resp.json())
      .catch(err => console.log(err))

  const formattedData = {
    username: data.response.players.personaname,
    profileUrl: data.response.players.profileurl,
    avatar: data.response.players.avatarmedium,
  }
  res.send(formattedData);
});

router.get('/wishlist', async (req: Request, res: Response) => {
  const urls = [
    'https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=0',
    'https://store.steampowered.com/wishlist/profiles/76561197996442713/wishlistdata/?p=1'
  ]
  const data = await Promise.all(
    urls.map(url => fetch(url)
      .then(resp => resp.json())
      .catch(err => console.log(err))
  ))

  const getGamesList = data.reduce((acc, x) => {
    for (let key in x) acc[key] = x[key];
    return acc;
  }, {})

  const formattedData = Object.values(getGamesList).map(({capsule, name, release_date, subs, review_desc}: any) => {
    return {
      name,
      logo: capsule,
      linkToShop: capsule && `https://store.steampowered.com/app/${capsule.match(/\d+/g)}/${name}`,
      releaseDate: release_date,
      price: subs && subs.length > 0 && (subs[0].price / 100),
      discount: subs && subs.length > 0 && subs[0].discount_pct,
      reviews: review_desc,
      platform: 'steam'
    }
  })

  res.send(formattedData);
});

export default router;
