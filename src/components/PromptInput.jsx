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
      <div className="flex items-center">
        <div className={`flex-1 flex items-center px-4 py-3 rounded-l-md border border-r-0 transition-colors font-mono text-sm ${
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
        </div>
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled || (languageModelStatus === 'available' && !promptValue.trim())}
          className={`px-4 py-3 rounded-r-md ml-0 border-l-0 border-transparent transition-colors font-mono text-lg ${
            isButtonDisabled || (languageModelStatus === 'available' && !promptValue.trim())
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {getButtonIcon()} {getButtonText()}
        </button>
      </div>
    </div>
  );
}

export default PromptInput;
