import React, { useState } from 'react';

function PromptInput({ onPromptSubmit, fileContent, languageModelStatus }) {
  const [promptValue, setPromptValue] = useState('');

  const isDisabled = languageModelStatus !== 'available';

  const getPlaceholderText = () => {
    switch (languageModelStatus) {
      case 'checking':
        return 'Checking AI assistant availability...';
      case 'downloadable':
        return 'AI model needs to be downloaded. Starting download...'
      case 'downloading':
        return 'AI model is downloading...';
      case 'unavailable':
        return 'AI assistant is unavailable.';
      case 'available':
        return 'Ask me anything about my work, projects, or experience...';
      default:
        return 'Loading...';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && promptValue.trim() && !isDisabled) {
      onPromptSubmit(promptValue, fileContent);
      setPromptValue('');
    }
  };

  const handleSubmit = () => {
    if (promptValue.trim() && !isDisabled) {
      onPromptSubmit(promptValue, fileContent);
      setPromptValue('');
    }
  };

  return (
    <div className="flex-none border-t border-gray-200 p-4">
      <div className="flex space-x-3">
        <input
          type="text"
          value={promptValue}
          onChange={(e) => setPromptValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholderText()}
          disabled={isDisabled}
          className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm ${
            isDisabled 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-900'
          }`}
        />
        <button
          onClick={handleSubmit}
          disabled={!promptValue.trim() || isDisabled}
          className={`px-4 py-2 rounded-lg transition-colors ${
            !promptValue.trim() || isDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default PromptInput;
