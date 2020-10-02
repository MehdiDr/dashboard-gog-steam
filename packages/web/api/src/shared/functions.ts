import logger from './Logger';

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const getGamesFromWishlist = (data: any) => {
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
