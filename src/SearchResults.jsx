import Tracklist from "./Tracklist";

const SearchResults = ({ searchResults, addTrack }) => {

    return (
        <Tracklist 
            searchResults={searchResults} 
            addTrack={addTrack} 
            isRemoval={false} 
        />
    )

}
export default SearchResults;