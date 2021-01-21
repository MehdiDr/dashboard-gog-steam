import { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

// Init shared
const router = Router();

router.post('/wishlist', (req: Request, res: Response) => {
  const steamid = req.body.steamId;
  res.redirect(303, `/api/games/wishlist/${steamid}`);
});

router.get('/wishlist/:steamid', async (req: Request, res: Response) => {
  const { steamid } = req.params;
  const urls = [
    `https://store.steampowered.com/wishlist/profiles/${steamid}/wishlistdata/?p=0`,
    `https://store.steampowered.com/wishlist/profiles/${steamid}/wishlistdata/?p=1`
  ];

  const data = await Promise.all(
    urls.map(url => fetch(url)
      .then(resp => resp.json())
      .catch(err => console.log(err))
  ));

  // tslint:disable-next-line: no-shadowed-variable
  const getGamesFromWishlist = (data: any) => {
    const getGamesList = data.reduce((acc: any, x: any) => {
      for (let key in x) acc[key] = x[key];
      return acc;
    }, {})

    return Object.values(getGamesList).map(({capsule, name, release_date, subs, review_desc}: any) => {
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
  }

  const token = await fetch('https://auth.gog.com/token?client_id=46899977096215655&client_secret=9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9&grant_type=refresh_token&code=0EOAkRSp2r3ITKWojCBPJTaAPsrSQ7CTL9EsDS_lOKcTgkeUUtlK7uizvcklp0oioPVeo-czpuX3qgqOQTLgoUZfRk0RSRbkn9r_0odU6E-SFd6E8OURLgCIAZR6Q69jdlmWHAR079PIUknySUKzGgqDB9Gg6pEbibmUJTIPgWM&refresh_token=AaAHnHnE3FNMYwVEm0MBDm-vgqcQ84uoRQ0iFWu5D1CmOVNqGpADZNEBXDMN_x_0')
  .then(resp => resp.json())
  .then(resp => resp.access_token)
  .catch(err => console.log(err));

  const wishlistData = await fetch('https://embed.gog.com/user/wishlist.json',
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(resp => resp.json())
    .catch(err => console.log(err))

  const idsGames = Object.keys(wishlistData.wishlist)

  const gamesNamesArray = await Promise.all(idsGames.map(async id => {
    try {
      const resp =  await fetch(encodeURI(`https://api.gog.com/products/${id}?expand=downloads,expanded_dlcs,description,screenshots,videos,related_products,changelog`), {
        headers: {
          'Accept': 'application/json'
        }
      })

      const data = await resp.json();
      return data;
    } catch (e) {
      console.log(e)
    }
  }));

  const gamesInfosArray = await Promise.all(gamesNamesArray.map(async ({title, images}) => {
    try {
      const resp =  await fetch(encodeURI(`https://embed.gog.com/games/ajax/filtered?mediaType=game&search=${title}`), {
        headers: {
          'Accept': 'application/json'
        }
      })

      const data = await resp.json();
      return {data, images}
    } catch (e) {
      console.log(e);
    }
  }))

  const formattedData = gamesInfosArray.map(game => {
    if(!(game?.data?.products.length > 0)) return null
    const {title, url, releaseDate, price, rating} = game?.data?.products[0];

    return {
      name: title,
      logo: `https://${game?.images?.logo2x.slice(2)}`,
      linkToShop: `https://gog.com/${url}`,
      releaseDate,
      price: parseFloat(price.amount),
      discount: price.discountPercentage,
      reviews: rating,
      platform: 'gog'
    }
  });

  const gamesWishlist = [...formattedData, ...getGamesFromWishlist(data)]

  res.send(gamesWishlist);
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
      .catch(err => console.log(err))
  ));

  // tslint:disable-next-line: no-shadowed-variable
  const getGamesFromWishlist = (data: any) => {
    const getGamesList = data.reduce((acc: any, x: any) => {
      for (let key in x) acc[key] = x[key];
      return acc;
    }, {})

    return Object.values(getGamesList).map(({capsule, name, release_date, subs, review_desc}: any) => {
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
  }

  res.send(getGamesFromWishlist(data));
});

// router.get('/owned-games', async (req: Request, res: Response) => {
//   const ids = await fetch(encodeURI('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5812343ABCE3859FA0797A2860BE0411&steamid=76561197996442713&format=json'))
//     .then(resp => resp.json())
//     .catch(err => console.log(err))

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
//       console.log(e)
//     }
//   }))

//   res.send(datas);
// });

// router.post('/friends', (req: Request, res: Response) => {
//   const steamid = req.body.steamId;
//   res.redirect(303, `/api/steam/friend/${steamid}`);
// });

export default router;
