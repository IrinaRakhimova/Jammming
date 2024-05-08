import Track from "./Track";

const Tracklist = ({ searchResults, addTrack, isRemoval }) => {
    return (
        <div>
            {searchResults && searchResults.length > 0 ? (
                searchResults.map((track, id) => (
                    <Track 
                        track={track}
                        key={track.id + id}
                        addTrack={addTrack}
                        isRemoval={isRemoval}
                    />
                ))
            ) : (
                <p className="text-white text-center">No results</p>
            )}
        </div>
    );
}

export default Tracklist;