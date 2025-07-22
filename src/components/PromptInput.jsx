import React, { useState, useEffect, useRef } from 'react';

function PromptInput({ onPromptSubmit, fileContent, languageModelStatus }) {
  const [promptValue, setPromptValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to recalculate
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [promptValue]);

  const isInputDisabled = languageModelStatus !== 'available';

  const getPlaceholderText = () => {
    switch (languageModelStatus) {
      case 'available':
        return 'Type your question here...';
      case 'checking':
        return 'Checking AI model availability...';
      case 'downloading':
        return 'AI model downloading...';
      case 'loading_model':
        return 'Initializing AI model...';
      case 'unavailable':
        return 'AI model is unavailable.';
      case 'ready_to_download':
        return 'AI model ready to download.';
      default:
        return 'Unknown AI status...';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && languageModelStatus === 'available' && promptValue.trim()) {
      e.preventDefault(); // Prevent default to avoid adding a new line
      onPromptSubmit(promptValue, fileContent);
      setPromptValue('');
    }
  };

  return (
    <div className={`full rounded-lg transition-colors font-mono text-sm ${
      isInputDisabled 
        ? 'bg-interactive-idle border-border-primary text-text-secondary opacity-75' 
        : 'bg-bg-primary border-border-primary text-text-primary'
    }`}>
      <textarea
        ref={textareaRef}
        value={promptValue}
        onChange={(e) => setPromptValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={getPlaceholderText()}
        disabled={isInputDisabled}
        className="resize-none rounded-lg p-3 w-full bg-bg-tertiary placeholder-text-secondary focus:outline-none ring-inset focus-visible:ring-2 focus-visible:ring-border-interactive"
        rows={1} // Start with 1 row and let JS handle growth
      />
    </div>
  );
}

export default PromptInput;
