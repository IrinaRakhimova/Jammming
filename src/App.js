import React, { useState, useEffect } from 'react';
import './App.css';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Header from './Header';
import Footer from './Footer';
import spotify from './spotify';
import Login from './Login';

function App() {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const authenticated = spotify.checkAuth();
    if (authenticated) {
      setLogged(authenticated);
    } else {
      console.log("Login failed.");
    }
  }, []); 

  const loginHandler = () => {
    spotify.getAuth();
  }

  const addTrack = (track) => {
    const isAdded = playlistTracks.some((addedTrack) => addedTrack.id === track.id);

    if (!isAdded) {
      const updatedPlaylist = [...playlistTracks, track];
      setPlaylistTracks(updatedPlaylist);
      updateSearchResults(track.id, true); // Mark track as inactive in search results
    }
  };

  const removeTrack = (track) => {
    const updatedPlaylist = playlistTracks.filter((addedTracks) => addedTracks.id !== track.id);
    setPlaylistTracks(updatedPlaylist);
    updateSearchResults(track.id, false); // Mark track as active in search results
};

  const updateSearchResults = (trackId, inactive) => {
    setSearchResults(prevResults => {
      return prevResults.map(result => {
        if (result.id === trackId) {
          return { ...result, inactive };
        }
        return result;
      });
    });
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    if (!playlistName) {
      alert("Please enter a playlist name above.");
      return;
    }

    const trackURIs = playlistTracks.map(track => track.uri);
    const name = playlistName;
    spotify.savePlaylistToSpotify(name, trackURIs)
      .then(() => {
        updatePlaylistName("");
        setPlaylistTracks([]);
      })
      .catch((error) => {
        console.error('Error saving playlist:', error);
        alert("Failed to save playlist. Please try again later.");
      });
  };

  const search = (query) => {
    spotify.searchInSpotify(query)
      .then((results) => {
        setSearchResults(results);
      })  
  };

  if (!logged) {
    return (
      <div className="App">
        <div className="text-white px-5 App-header green">
          <Header />
        </div>
        <div className="d-flex align-items-center App-content">
          <div className="flex-fill">
            <Login loginHandler={loginHandler}/>
          </div>  
        </div>
        <div className="green text-center p-3">
          <Footer />
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <div className="text-white px-5 App-header green">
          <Header />
        </div>
        <div className="d-flex justify-content-evenly App-content">
          <div className="px-5 py-5 flex-fill flex-grow-1">
            <SearchBar search={search} />
            <SearchResults searchResults={searchResults} addTrack={addTrack} removeTrack={removeTrack} />
          </div>
          <div className="px-5 py-5 flex-fill border-start border-dark">
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              removeTrack={removeTrack}
              updatePlaylistName={updatePlaylistName}
              savePlaylist={savePlaylist}
            />
          </div>
        </div>
        <div className="green text-center p-3">
          <Footer />
        </div>
      </div>
    )
  };
};

export default App;
