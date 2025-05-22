import React from 'react';
import { FaStar, FaCodeBranch } from 'react-icons/fa';

const GitHubIssueList = ({ repos }) => {
  if (!repos.length) {
    return <p className="text-gray-500">No repositories found</p>;
  }
  
  return (
    <div className="space-y-4">
      {repos.map(repo => (
        <div key={repo.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            {repo.name}
          </a>
          
          <p className="text-gray-600 text-sm mt-2">
            {repo.description || 'No description provided'}
          </p>
          
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <FaCodeBranch />
              {repo.forks_count}
            </span>
            {repo.language && (
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                {repo.language}
              </span>
            )}
            <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GitHubIssueList;
