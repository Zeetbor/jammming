import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'
import Spotify from '../../util/Spotify.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "Playlist 1",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.filter(savedTrack => savedTrack.id === track.id)) {
      return;
    }
  }

  updatePlaylistName(name) {
    return this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
      <div >
        <h1> Ja <span className = "highlight" > mmm < /span>ing</h1 >
        <div className = "App" >
          <SearchBar onSearch={this.search}/>
          <div className = "App-playlist" >
            <SearchResults
              searchResults = {this.state.searchResults}
              onAdd = {this.addTrack}
            />
            <Playlist
              PlaylistName = {this.state.playlistName}
              PlaylistTracks = {this.state.playlistTracks}
              onRemove = {this.removeTrack}
              onNameChange = {this.updatePlaylistName}
              onSave = {this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
};

export default App;
