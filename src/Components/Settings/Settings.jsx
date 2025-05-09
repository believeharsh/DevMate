import React from "react";

const Settings = () => {
  return (
    <div className="p-8 w-full text-white bg-neutral-900">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-neutral-800 rounded-2xl p-6 space-y-6 max-w-2xl shadow-lg">
        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <span>Enable Dark Mode</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        {/* Notifications Toggle */}
        <div className="flex justify-between items-center">
          <span>Email Notifications</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        {/* Theme Selector */}
        <div className="flex justify-between items-center">
          <span>Theme</span>
          <select className="bg-neutral-700 text-white px-3 py-2 rounded-md outline-none">
            <option value="default">Default</option>
            <option value="blue">Ocean Blue</option>
            <option value="green">Forest Green</option>
            <option value="purple">Royal Purple</option>
          </select>
        </div>

        {/* Account Privacy */}
        <div className="flex justify-between items-center">
          <span>Private Account</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-medium transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
