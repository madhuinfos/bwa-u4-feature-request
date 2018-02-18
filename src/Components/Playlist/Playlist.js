import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  };

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
  return (
  <div className="Playlist">
    <input onChange ={this.handleNameChange} value={this.props.playlist.name}/>
    <TrackList onRemove ={this.props.onRemove} isRemoval = {true} tracks = {this.props.playlist.tracks}/>
    <a onClick = {this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
  </div>);
  }
}

export default Playlist;
