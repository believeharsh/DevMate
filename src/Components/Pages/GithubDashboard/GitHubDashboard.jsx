import React, { useEffect, useState } from 'react';
import { FaGithub, FaCodeBranch, FaExclamationCircle } from 'react-icons/fa';
import GitHubAuth from '../../Github/GitHubAuth';
import GitHubRepoList from '../../Github/GitHubRepoList';
import GitHubPRList from '../../Github/GitHubPRList';
import GitHubIssueList from '../../Github/GithubIssueList';
import { fetchUserIssues, fetchUserPRs, fetchUserRepos } from '../../../githubServices';
import { useAuth } from '../../../Context/Auth/AuthContext';

const GitHubDashboard = () => {
  const [repos, setRepos] = useState([]);
  const [prs, setPRs] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getGitHubToken } = useAuth();
  
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const token = await getGitHubToken();
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        const [reposData, prsData, issuesData] = await Promise.all([
          fetchUserRepos(token),
          fetchUserPRs(token),
          fetchUserIssues(token)
        ]);
        
        setRepos(reposData);
        setPRs(prsData);
        setIssues(issuesData);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError('Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGitHubData();
  }, [getGitHubToken]);
  
  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }
  
  const token = getGitHubToken();
  if (!token) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center gap-3 mb-4">
          <FaGithub className="text-2xl" />
          <h2 className="text-xl font-semibold">GitHub Integration</h2>
        </div>
        <p className="mb-4 text-gray-600">
          Connect your GitHub account to see your repositories, pull requests, and issues directly in your dashboard.
        </p>
        <GitHubAuth />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="text-red-500 mb-4">{error}</div>
        <GitHubAuth />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaGithub className="text-2xl" />
            <h2 className="text-xl font-semibold">Recent Repositories</h2>
          </div>
          <span className="text-sm text-gray-500">{repos.length} repositories</span>
        </div>
        <GitHubRepoList repos={repos} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <FaCodeBranch className="text-2xl" />
            <h2 className="text-xl font-semibold">Open Pull Requests</h2>
          </div>
          <GitHubPRList prs={prs} />
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <FaExclamationCircle className="text-2xl" />
            <h2 className="text-xl font-semibold">Open Issues</h2>
          </div>
          <GitHubIssueList issues={issues} />
        </div>
      </div>
    </div>
  );
};

export default GitHubDashboard;
