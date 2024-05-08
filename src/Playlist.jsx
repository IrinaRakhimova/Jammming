import Track from "./Track";

const Playlist = ({ playlistName, playlistTracks, removeTrack, updatePlaylistName, savePlaylist }) => {
    function handleNameChange({ target }) {
        updatePlaylistName(target.value);
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input defaultValue={playlistName} placeholder="Enter playlist name" className="form-control bg-white" onChange={handleNameChange} />
            </div>
            {playlistTracks && playlistTracks.length > 0 ? (
                playlistTracks.map((track, index) => (
                    <Track
                        key={index}
                        track={track}
                        removeTrack={removeTrack}
                        isRemoval={true}
                    />
                ))
            ) : (
                <p className="text-white text-center">No added songs yet</p>
            )}
            <br />
            <div className="d-flex justify-content-center">
                <button className="btn my-button text-white" onClick={savePlaylist}>Save to Spotify</button>
            </div>
        </div>    
    );
};

export default Playlist;