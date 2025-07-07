import React from 'react';
import { useState } from 'react';

function Navbar({ onPromptSubmit }) {
  const [promptValue, setPromptValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && promptValue.trim()) {
      onPromptSubmit(promptValue);
      setPromptValue('');
    }
  };

  return (
    <div className="size-full bg-white shadow-sm border-b border-gray-200">
      <div className="flex px-6 py-4">
        {/* Profile Section - Fixed width to match sidebar */}
        <div className="w-64 flex items-center">
          <img 
            className="w-12 h-12 rounded-full mr-3" 
            src="/img/portrait_small.jpeg" 
            alt="Luis Sanchez" 
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Luis Sanchez</h2>
            <p className="text-sm text-gray-600">Software Engineer</p>
          </div>
        </div>
        
        {/* Prompt Input Section */}
        <div className="flex-1 flex items-center px-6">
          <div className="w-full max-w-2xl">
            <input
              type="text"
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about my work, projects, or experience..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
