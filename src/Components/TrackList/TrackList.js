import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component{
  render(){
    const tracks =
    this.props.tracks.map((track, i) => {
    return <Track onAdd = {this.props.onAdd} isRemoval ={this.props.isRemoval} onRemove = {this.props.onRemove} key = {track.ID} track = {track} />
  });
    return (<div className="TrackList">
    {
      tracks
    }
</div>);
  }
}

export default TrackList;
