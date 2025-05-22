import React from 'react';
import { useAuth } from "../../Context/Auth/AuthContext";
import { FaGithub } from 'react-icons/fa';

const GitHubAuth = () => {
  const { currentUser, storeGitHubToken } = useAuth();
  
const handleGitHubLogin = () => {
  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  
  console.log("GitHub Client ID:", GITHUB_CLIENT_ID); // Check if this is defined
  
  if (!GITHUB_CLIENT_ID) {
    console.error("GitHub Client ID is not defined in environment variables");
    alert("GitHub integration is not properly configured. Please contact the administrator.");
    return;
  }
  
  const redirectUri = encodeURIComponent("http://localhost:5173/github/callback");
  const scope = encodeURIComponent("repo user");
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}`;
  console.log("GitHub Auth URL:", authUrl);
  
  window.location.href = authUrl;
};
  
  return (
    <button
      onClick={handleGitHubLogin}
      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
    >
      <FaGithub />
      Connect GitHub Account
    </button>
  );
};

export default GitHubAuth;
