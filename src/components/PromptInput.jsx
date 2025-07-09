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
          ? 'bg-interactive-idle border-border-primary text-text-secondary opacity-75' 
          : 'bg-secondary border-border-primary text-text-primary focus-within:border-border-interactive'
      }`}>
        <span className="text-text-secondary mr-2">&gt;</span>
        <input
          type="text"
          value={promptValue}
          onChange={(e) => setPromptValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholderText()}
          disabled={isInputDisabled}
          className="flex-1 bg-transparent outline-none placeholder-text-secondary font-mono"
        />
        <span className="text-text-secondary ml-2 animate-pulse">|</span>
      </div>
    </div>
  );
}

export default PromptInput;
