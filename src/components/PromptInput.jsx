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
        return 'press enter to download AI assistant...';
      case 'downloading':
        return `Downloading AI model... ${downloadProgress}%`;
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
        return '';
      case 'downloading':
        return `${downloadProgress}%`;
      case 'loading_model':
        return '';
      case 'unavailable':
        return '';
      case 'available':
        return '';
      default:
        return '';
    }
  };

  const getButtonIcon = () => {
    switch (languageModelStatus) {
      case 'ready_to_download':
        return '⬇';
      case 'downloading':
        return '⬇';
      case 'loading_model':
        return '⏳';
      case 'unavailable':
        return '❌';
      case 'available':
        return '→';
      default:
        return '⏳';
    }
  };

  return (
    <div className="flex-none border-t border-gray-200 p-4">
      <div className="flex items-center space-x-3">
        <div className={`flex-1 flex items-center px-4 py-3 rounded-lg border transition-colors font-mono text-sm ${
          isInputDisabled 
            ? 'bg-gray-50 border-gray-200 text-gray-400' 
            : 'bg-gray-900 border-gray-700 text-green-400 focus-within:border-green-500'
        }`}>
          <span className="text-green-500 mr-2">ask:</span>
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholderText()}
            disabled={isInputDisabled}
            className="flex-1 bg-transparent outline-none placeholder-gray-500 font-mono"
          />
          <span className="blinking-cursor text-green-400 ml-1">|</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled || (languageModelStatus === 'available' && !promptValue.trim())}
          className={`px-4 py-3 rounded-lg transition-colors font-mono text-lg ${
            isButtonDisabled || (languageModelStatus === 'available' && !promptValue.trim())
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-800 text-green-400 hover:bg-gray-700 border border-gray-600'
          }`}
        >
          {getButtonIcon()} {getButtonText()}
        </button>
      </div>
    </div>
  );
}

export default PromptInput;
