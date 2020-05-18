import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';

// Init shared
const router = Router();

router.get('/wishlist', async (req: Request, res: Response) => {
  const wishlistData = await fetch('https://embed.gog.com/user/wishlist.json',
  {
    headers: {
      'Authorization': 'Bearer rnedoX6gUMQzd2lxdffF8FE62BuqEd3MDlEET2f6-oR0Bt4s-IAnZoxYqyQ9tErbH8zMIXD5_INzywFTPHBPG2WOpCnZCRcdLYM410mU1hm5WeRF3ILYlhW_dM8mYK8XiPld0o9hhhn9g49h7Db4_zfrkoth5-zhEa1CM2AL9Gk'
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
      console.log(e)
    }
  }))

  res.send(gamesInfosArray);
});

export default router;


// token: https://auth.gog.com/token?client_id=46899977096215655&client_secret=9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9&grant_type=authorization_code&code=0EOAkRSp2r3ITKWojCBPJTaAPsrSQ7CTL9EsDS_lOKcTgkeUUtlK7uizvcklp0oioPVeo-czpuX3qgqOQTLgoUZfRk0RSRbkn9r_0odU6E-SFd6E8OURLgCIAZR6Q69jdlmWHAR079PIUknySUKzGgqDB9Gg6pEbibmUJTIPgWM&redirect_uri=&redirect_uri=https%3A%2F%2Fembed.gog.com%2Fon_login_success%3Forigin%3Dclient
// refresh: https://auth.gog.com/token?client_id=46899977096215655&client_secret=9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9&grant_type=refresh_token&code=0EOAkRSp2r3ITKWojCBPJTaAPsrSQ7CTL9EsDS_lOKcTgkeUUtlK7uizvcklp0oioPVeo-czpuX3qgqOQTLgoUZfRk0RSRbkn9r_0odU6E-SFd6E8OURLgCIAZR6Q69jdlmWHAR079PIUknySUKzGgqDB9Gg6pEbibmUJTIPgWM&refresh_token=AaAHnHnE3FNMYwVEm0MBDm-vgqcQ84uoRQ0iFWu5D1CmOVNqGpADZNEBXDMN_x_0
