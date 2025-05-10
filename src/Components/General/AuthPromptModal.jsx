import React from "react";
import { useNavigate } from "react-router-dom";

const AuthPromptModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (navigatePath) => {
    navigate(navigatePath) ; 
    onClose() ; 
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-2">Login Required</h2>
        <p className="text-gray-600 mb-4">
          Please log in or sign up to perform this action.
        </p>

        <div className="flex justify-center gap-4 mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            onClick={() => handleNavigate("/login")}
          >
            Log In
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-xl"
            onClick={() => handleNavigate("/signup")}
          >
            Sign Up
          </button>
        </div>

        <button
          className="text-sm text-gray-500 hover:underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthPromptModal;
