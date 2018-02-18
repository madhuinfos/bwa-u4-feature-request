
let accessToken ;
let clientID = 'ccebe5f855004815bbcac56f822da2de';
let redirectUri = 'http://localhost:3000/';

const Spotify ={
  readAccessToken(){
    let url = window.location.href;
    let token = url.match(/access_token=([^&]*)/);
    let expiration = url.match(/expires_in=([^&]*)/);

    if(token && expiration){
      accessToken = token[1];

      window.setTimeout(() => accessToken = '', expiration[1] * 1000);
      window.history.pushState('Access Token', null, '/');
    }
  },

  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    else{
      Spotify.readAccessToken();
      if(!accessToken){
        window.location = "https://accounts.spotify.com/authorize?client_id=" +clientID+"&response_type=token&scope=playlist-modify-public&redirect_uri="+redirectUri;
      }
      else {
          return accessToken;
      }
    }
  },

  async search(searchTerm){
    try{
      let token = Spotify.getAccessToken();
        let response = await fetch('https://api.spotify.com/v1/search?type=track&q='+searchTerm, {
        headers: {
          'Authorization': 'Bearer ' +token
        }
      });
      if(response.ok){
        let jsonResponse = await response.json();
        if(jsonResponse){
          return jsonResponse.tracks.items.map(track => ({
            ID: track.id,
            Name: track.name,
            Artist: track.artists[0].name,
            Album: track.album.name,
            URI: track.uri,
            previewUrl: track.preview_url
          }));
        }
        else{
          return [];
        }
      }
    }
    catch(e){
      console.log(e);
    }
},

async savePlayList(playListName, tracksUris){
  if(!playListName && !tracksUris && tracksUris.length <= 0){
    console.log('invalid arguments for save playlist')
    return;
  }
  let token = Spotify.getAccessToken();
  let headers = {
    'Authorization': 'Bearer ' +token };
  let userID = '';
  let response = await fetch('https://api.spotify.com/v1/me', {headers: headers});
  if(response.ok){
    let jsonResponse = await response.json();
    userID = jsonResponse.id;
    console.log(userID);
  }
  headers = {
    'Authorization': 'Bearer ' +token,
    "Content-type": "application/json"
  };
  let playlistID = '';
  response = await fetch('https://api.spotify.com/v1/users/' + userID +'/playlists', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: playListName
    })
  });
  if(response.ok){
    let jsonResponse = await response.json();
    playlistID = jsonResponse.id;
    console.log(playlistID);
  }

  response = await fetch('https://api.spotify.com/v1/users/' + userID + '/playlists/'+ playlistID +'/tracks',{
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      uris : tracksUris
    })
  });
  if(response.ok){
    let jsonResponse = await response.json();
    playlistID = jsonResponse.id;
  }
}
};

export default Spotify;
