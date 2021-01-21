export async function fetchWishlist(steamId: string) {
  try {

    const steamApiResp = await fetch(`http://localhost:9000/api/games/wishlist/${steamId}`)
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
     console.log(e)
  }
}

export async function fetchUserInfos() {
  try {
    const steamApiResp = await fetch('http://localhost:9000/api/users/user')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchSteamFriends() {
  try {
    const steamApiResp = await fetch('http://localhost:9000/api/users/friends')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchSteamFriendWishlist(steamId: number) {
  try {
    const steamApiResp = await fetch(`http://localhost:9000/api/games/friend/${steamId}`)
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}
