const Track = ({ track, addTrack, removeTrack, isRemoval }) => {

    function handleButtonClick() {
        if (isRemoval) {
            removeTrack(track);
        } else {
            addTrack(track);
        }
    }

    return (
        <div className="border-bottom border-dark d-flex justify-content-between">
            <div>
                <h3 className="text-white">{track.name}</h3>
                <p className="text-white-50">{track.artist}  |  {track.album}</p>
            </div>
            <button 
                className={`btn shadow-none add-button fs-2`} 
                onClick={handleButtonClick}
            >
                {isRemoval ? '-' : '+'}
            </button>
        </div>
    );
};
    
export default Track;