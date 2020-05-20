import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';

// Init shared
const router = Router();

router.get('/user', async (req: Request, res: Response) => {
  const datas = await fetch('https://embed.gog.com//users/info/48800609011490?expand=friendStatus,wishlistStatus,blockedStatus')
    .then(resp => resp.json())
    .catch(err => console.log(err));

    const formattedData = {
      gogUsername: datas.username,
      gogAvatar: datas.avatars.medium,
      gogProfileUrl: 'https://www.gog.com/feed'
    }

  res.send(formattedData);
});


router.get('/wishlist', async (req: Request, res: Response) => {
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
      logo: `http://${game?.images?.logo.slice(2)}`,
      linkToShop: `https://gog.com/${url}`,
      releaseDate,
      price: price.amount,
      discount: price.discountPercentage,
      reviews: rating,
      platform: 'gog'
    }
  });

  res.send(formattedData);
});

export default router;
