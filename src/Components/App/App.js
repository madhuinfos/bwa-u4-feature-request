import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


let playlist = {
  name: 'First Playlist',
  tracks: []
};

let tracks = [];


class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        searchResults: tracks,
        playlist: playlist
      };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlayList = this.savePlayList.bind(this);
      this.search = this.search.bind(this);
  };

  addTrack(track){
    const selectedTrack = this.state.playlist.tracks.find(
      playListTrack => playListTrack.ID === track.ID
    );

    if(selectedTrack === undefined){
      let newPlaylist = {...this.state.playlist};
      newPlaylist.tracks.push(track);
      this.setState({playlist: newPlaylist});
    }
  };

  removeTrack(track){
    const selectedTrackIndex = this.state.playlist.tracks.findIndex(
      playListTrack => playListTrack.ID === track.ID
    );

    let newPlaylist = {...this.state.playlist};
    if(selectedTrackIndex >= 0){
      newPlaylist.tracks.splice(selectedTrackIndex, 1);
      this.setState({playlist: newPlaylist});
    }
  };

  updatePlaylistName(name){
    debugger;
    let newPlaylist = {...this.state.playlist};
    newPlaylist.name = name;
    this.setState({playlist : newPlaylist});
  };

  savePlayList(){
    let trackURIs = this.state.playlist.tracks.map(x => x.URI);
     Spotify.savePlayList(this.state.playlist.name, trackURIs).then(
       this.setState({
         playlist: {
           name: 'New Playlist',
           tracks: []
         }
       })
     );
  };

  search(searchTerm){
    Spotify.search(searchTerm).then(
      tracks => this.setState({
        searchResults : tracks
      })
    );
    console.log(searchTerm);
  }

  render() {
    return (
  <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
    <SearchBar onSearch ={this.search} />
    <div className="App-playlist">
      <SearchResults onAdd ={this.addTrack} searchResults ={this.state.searchResults} />
      <Playlist onSave = {this.savePlayList} onNameChange = {this.updatePlaylistName} onRemove ={this.removeTrack}  playlist = {this.state.playlist}/>
      </div>
    </div>
  </div>
    );
  }
}

export default App;
