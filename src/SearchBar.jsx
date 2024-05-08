import { useState, useEffect } from "react";

const SearchBar = ({ search }) => {
const [query, setQuery] = useState("");

  useEffect(() => {
    window.localStorage.setItem('query', query);
  }, [query])

  function handleSearch() {
      search(query); 
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
    handleSearch();
    }
  }

    return (
        <div className="input-group mb-3">
            <input type="text" value={query} onKeyDown={handleKeyPress} onChange={(e) => setQuery(e.target.value)} className="form-control bg-white" placeholder="Enter a song or an artist" />
            <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>   
        </div>
    );
};

export default SearchBar;
