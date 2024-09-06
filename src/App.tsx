import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = 'f72c23fc'; // Your OMDb API key

  const searchMovie = async () => {
    if (query.trim()) {
      setLoading(true);
      setError('');
      try {
        // Ensure the URL uses https
        const response = await axios.get(
          `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${API_KEY}`
        );
        if (response.data.Response === 'True') {
          setMovieData(response.data);
          setError('');
        } else {
          setMovieData(null);
          setError('Movie not found. Please try again.');
        }
      } catch (err) {
        console.error('Error:', err); // Log error for debugging
        setError('Error fetching data. Please try again.');
      }
      setLoading(false);
    } else {
      setError('Please enter a movie name.');
    }
  };

  const searchTrailerOnYouTube = (movieTitle) => {
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)}+trailer`;
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Movie Search & Trailer</h1>
      <input
        type="text"
        placeholder="Enter movie name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button onClick={searchMovie} style={{ padding: '10px' }} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {movieData && (
        <div style={{ marginTop: '20px' }}>
          <h2>{movieData.Title} ({movieData.Year})</h2>
          <img
            src={movieData.Poster}
            alt={movieData.Title}
            style={{ width: '200px', marginBottom: '20px' }}
          />
          <p>{movieData.Plot}</p>
          <button
            onClick={() => searchTrailerOnYouTube(movieData.Title)}
            style={{ padding: '10px', marginTop: '10px' }}
          >
            Watch Trailer
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
