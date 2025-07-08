import React, { useState } from 'react';

function PromptInput({ onPromptSubmit, fileContent, languageModelStatus }) {
  const [promptValue, setPromptValue] = useState('');

  const isInputDisabled = languageModelStatus !== 'available';

  const getPlaceholderText = () => {
    switch (languageModelStatus) {
      case 'checking':
        return 'Checking AI assistant availability...';
      case 'downloading':
        return 'AI model downloading...';
      case 'loading_model':
        return 'Initializing AI model...';
      case 'unavailable':
        return 'AI assistant is unavailable.';
      case 'available':
        return 'type your question here...';
      default:
        return 'Loading...';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && languageModelStatus === 'available' && promptValue.trim()) {
        onPromptSubmit(promptValue, fileContent);
        setPromptValue('');
    }
  };

  return (
    <div className="flex-none">
      <div className={`w-full flex items-center px-4 py-3 rounded-md border transition-colors font-mono text-sm ${
        isInputDisabled 
          ? 'bg-gray-100 border-gray-200 text-gray-400' 
          : 'bg-white border-gray-300 text-gray-900 focus-within:border-indigo-500'
      }`}>
        <span className="text-gray-500 mr-2">ask:</span>
        <input
          type="text"
          value={promptValue}
          onChange={(e) => setPromptValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholderText()}
          disabled={isInputDisabled}
          className="flex-1 bg-transparent outline-none placeholder-gray-400 font-mono"
        />
        <span className="text-gray-400 ml-2 animate-pulse">|</span>
      </div>
    </div>
  );
}

export default PromptInput;
