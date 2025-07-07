import React, { useState } from 'react';

function PromptInput({ onPromptSubmit }) {
  const [promptValue, setPromptValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && promptValue.trim()) {
      onPromptSubmit(promptValue);
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
          placeholder="Ask me anything about my work, projects, or experience..."
          className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
        <button
          onClick={() => {
            if (promptValue.trim()) {
              onPromptSubmit(promptValue);
              setPromptValue('');
            }
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!promptValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default PromptInput;
