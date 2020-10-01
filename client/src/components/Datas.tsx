export async function fetchGogWithlist() {
  try {
    const gogApiResp = await fetch('https://dashboard-api.vercel.app/api/gog/wishlist');
    const gogData = await gogApiResp.json();

    return gogData;
  } catch(e) {
     console.log(e)
  }
}

export async function fetchSteamWishlist() {
  try {
    const steamApiResp = await fetch('https://dashboard-api.vercel.app/api/steam/wishlist')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchSteamUser() {
  try {
    const steamApiResp = await fetch('https://dashboard-api.vercel.app/api/steam/user')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchGogUser() {
  try {
    const gogApiResp = await fetch('https://dashboard-api.vercel.app/api/gog/user')
    const gogData = await gogApiResp.json();

    return gogData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchSteamFriends() {
  try {
    const steamApiResp = await fetch('https://dashboard-api.vercel.app/api/steam/friends')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchSteamFriendWishlist(steamId: number) {
  try {
    const steamApiResp = await fetch(`https://dashboard-api.vercel.app/api/steam/friend/${steamId}`)
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}
