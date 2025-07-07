import React, { useState } from 'react';

function PromptInput({ onPromptSubmit, onDownloadModel, fileContent, languageModelStatus, downloadProgress }) {
  const [promptValue, setPromptValue] = useState('');

  const isInputDisabled = !['available', 'ready_to_download'].includes(languageModelStatus);
  const isButtonDisabled = languageModelStatus === 'downloading' || languageModelStatus === 'checking' || languageModelStatus === 'unavailable';

  const getPlaceholderText = () => {
    switch (languageModelStatus) {
      case 'checking':
        return 'Checking AI assistant availability...';
      case 'ready_to_download':
        return 'Click "Download AI Assistant" to get started...';
      case 'downloading':
        return `Downloading AI model... ${downloadProgress}%`;
      case 'loading_from_cache':
        return 'Loading AI model from cache...';
      case 'loading_model':
        return 'Initializing AI model...';
      case 'cached_available':
        return 'Loading cached AI model...';
      case 'unavailable':
        return 'AI assistant is unavailable.';
      case 'available':
        return 'Ask me anything about my work, projects, or experience...';
      default:
        return 'Loading...';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isButtonDisabled) {
      if (languageModelStatus === 'ready_to_download') {
        onDownloadModel();
      } else if (languageModelStatus === 'available' && promptValue.trim()) {
        onPromptSubmit(promptValue, fileContent);
        setPromptValue('');
      }
    }
  };

  const handleSubmit = () => {
    if (languageModelStatus === 'ready_to_download') {
      onDownloadModel();
    } else if (languageModelStatus === 'available' && promptValue.trim()) {
      onPromptSubmit(promptValue, fileContent);
      setPromptValue('');
    }
  };

  const getButtonText = () => {
    switch (languageModelStatus) {
      case 'ready_to_download':
        return 'Download AI Assistant';
      case 'downloading':
        return `Downloading... ${downloadProgress}%`;
      case 'loading_from_cache':
      case 'loading_model':
      case 'cached_available':
        return 'Loading...';
      case 'unavailable':
        return 'Unavailable';
      case 'available':
        return 'Send';
      default:
        return 'Loading...';
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
          disabled={isInputDisabled}
          className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm ${
            isInputDisabled 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-900'
          }`}
        />
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled || (languageModelStatus === 'available' && !promptValue.trim())}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isButtonDisabled || (languageModelStatus === 'available' && !promptValue.trim())
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}

export default PromptInput;
