import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

// Create authenticated GitHub API client
const createGitHubClient = (token) => {
  return axios.create({
    baseURL: GITHUB_API_BASE,
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

// Fetch user repositories
export const fetchUserRepos = async (token) => {
  try {
    const client = createGitHubClient(token);
    const response = await client.get('/user/repos?sort=updated&per_page=10');
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

// Fetch user pull requests
export const fetchUserPRs = async (token) => {
  try {
    const client = createGitHubClient(token);
    const response = await client.get('/search/issues?q=is:pr+author:@me+is:open');
    return response.data.items;
  } catch (error) {
    console.error('Error fetching PRs:', error);
    throw error;
  }
};

// Fetch user issues
export const fetchUserIssues = async (token) => {
  try {
    const client = createGitHubClient(token);
    const response = await client.get('/search/issues?q=is:issue+author:@me+is:open');
    return response.data.items;
  } catch (error) {
    console.error('Error fetching issues:', error);
    throw error;
  }
};

// Function to exchange GitHub code for token using our Express server
export const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post('http://localhost:4000/api/github/token', { code });
    return response.data;
  } catch (error) {
    console.error('Error exchanging GitHub code:', error);
    throw error;
  }
};
