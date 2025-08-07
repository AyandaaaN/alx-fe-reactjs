import axios from 'axios';

export const searchUsers = async (username, location, minRepos) => {
  let query = `${username}`;

  if (location) {
    query += `+location:${location}`;
  }

  if (minRepos) {
    query += `+repos:>=${minRepos}`;
  }

  const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
  return response.data.items; // array of users
};
