import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Auth/AuthContext';
import { exchangeCodeForToken } from '../../githubServices';

const GitHubCallback = () => {
  const [status, setStatus] = useState('Processing GitHub authentication...');
  const navigate = useNavigate();
  const { storeGitHubToken } = useAuth();
  
useEffect(() => {
  const processCode = async () => {
    console.log("GitHubCallback mounted, URL:", window.location.href);
    
    try {
      // Get the code from URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      console.log("GitHub code from URL:", code);
      
      if (!code) {
        console.log("No code found in URL");
        setStatus('No authorization code found');
        setTimeout(() => navigate('/dashboard'), 5000); // Increased timeout
        return;
      }
      
      console.log("About to exchange code for token");
      // Exchange code for token using our service
      const tokenData = await exchangeCodeForToken(code);
      console.log("Token exchange response:", tokenData);
      
      if (tokenData && tokenData.access_token) {
        console.log("Successfully got access token");
        await storeGitHubToken(tokenData.access_token);
        setStatus('GitHub connected successfully!');
      } else {
        console.log("No access token in response");
        setStatus('Failed to get GitHub token');
      }
      
      // Redirect back to dashboard
      console.log("Will redirect to dashboard in 5 seconds");
      setTimeout(() => navigate('/dashboard'), 5000); // Increased timeout
    } catch (error) {
      console.error('GitHub auth error:', error);
      setStatus('Error connecting to GitHub: ' + error.message);
      setTimeout(() => navigate('/dashboard'), 5000); // Increased timeout
    }
  };
  
  processCode();
}, [navigate, storeGitHubToken]);
  
  return (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{status}</h2>
      <div className="animate-pulse bg-gray-200 h-2 w-full rounded"></div>
      <button 
        onClick={() => navigate('/dashboard')} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
);
};

export default GitHubCallback;
