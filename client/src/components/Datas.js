export async function fetchGogWithlist() {
  try {
    const gogApiResp = await fetch('/api/gog/wishlist');
    const gogData = await gogApiResp.json();

    return gogData;
  } catch(e) {
     console.log(e)
  }
}

export async function fetchData() {
  try {
    const steamApiResp = await fetch('/api/steam/wishlist')
    const steamData = await steamApiResp.json();

    return steamData;
  } catch(e) {
    console.log(e)
  }
}
