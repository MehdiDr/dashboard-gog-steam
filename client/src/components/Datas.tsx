export async function fetchWishlist() {
  try {

    const steamApiResp = await fetch('https://dashboard-api.vercel.app/api/games/wishlist')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
     console.log(e)
  }
}

export async function fetchUserInfos() {
  try {
    const steamApiResp = await fetch('https://dashboard-api.vercel.app/api/users/user')
    const steamData = await steamApiResp.json();

    console.log(steamData)

    return steamData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchSteamFriends() {
  try {
    const steamApiResp = await fetch('https://dashboard-api.vercel.app/api/users/friends')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchSteamFriendWishlist(steamId: number) {
  try {
    const steamApiResp = await fetch(`https://dashboard-api.vercel.app/api/games/friend/${steamId}`)
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}
