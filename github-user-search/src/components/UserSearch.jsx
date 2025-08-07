// src/components/UserSearch.jsx
import { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    let query = `${username} in:login`;
    if (location.trim()) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;

    try {
      setLoading(true);
      setError('');
      setResults([]);

      const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
      setResults(response.data.items || []);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Advanced GitHub User Search</h2>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Username (required)"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location (optional)"
          className="w-full border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Repositories (optional)"
          className="w-full border p-2 rounded"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {!loading && results.length === 0 && username && !error && (
        <p className="mt-6 text-center text-gray-500">No users found for the search criteria.</p>
      )}

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map(user => (
            <div key={user.id} className="border p-4 rounded flex items-center gap-4">
              <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold text-lg">{user.login}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
