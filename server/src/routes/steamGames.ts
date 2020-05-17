import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';

// Init shared
const router = Router();

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

  res.send(data)
});

export default router;
