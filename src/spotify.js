let accessToken;
let userId;
const clientId = "cc27cc8fdd314c4c8758dbc6d06c60c8";
const redirectUrl = "https://jammming-irina.netlify.app";


const spotify = {
    getAuth () {
        const tokenURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        window.location = tokenURL;
    },

    checkAuth () {
        const authenticated = window.location.href.match(/access_token=([^&]*)/);
        if (authenticated) {
            accessToken = authenticated[1];
            window.history.replaceState({}, document.title, window.location.pathname);
            return true;
        } else {
            return false;
        }      
    },

    savePlaylistToSpotify (name, trackUris) {
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },           
            body: JSON.stringify({ 'name': name }),
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Failed to create playlist');
            }
        })
        .then((data) => {
            const playlistId = data.id;
            const tracksToAdd = {
            'uris': trackUris,
            }

            const addTracksURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
            return fetch(addTracksURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tracksToAdd),
            })
        })
        .then((res) => res.json())
        .then((result) => {
            if(result) {
                return true;
            } else {
                return false;
            }
        });
    },

    searchInSpotify (query) {
        const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
        return fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
        })
        .then(response => response.json())
        .then((data) => {
            const tracksResults = data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                image: track.album.images[0].url,
                uri: track.uri,
            }));
            return tracksResults;
        });            
    },
};

export default spotify;