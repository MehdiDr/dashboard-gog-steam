export async function fetchGogWithlist() {
  try {
    const gogApiResp = await fetch('/api/gog/wishlist');
    const gogData = await gogApiResp.json();

    return gogData;
  } catch(e) {
     console.log(e)
  }
}

export async function fetchSteamWishlist() {
  try {
    const steamApiResp = await fetch('/api/steam/wishlist')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchSteamUser() {
  try {
    const steamApiResp = await fetch('/api/steam/user')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}

export async function fetchGogUser() {
  try {
    const gogApiResp = await fetch('/api/gog/user')
    const gogData = await gogApiResp.json();

    return gogData;
  } catch(e) {
    console.log(e)
  }
}
