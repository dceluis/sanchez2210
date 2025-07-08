import React from 'react';
import { X } from 'lucide-react';
import StatusToolbar from './StatusToolbar';
import PromptInput from './PromptInput';

const ChatPanel = ({
  messages,
  onClose,
  languageModelStatus,
  downloadProgress,
  onDownloadModel,
  onPurgeModel,
  onPromptSubmit,
}) => {
  return (
    <div className="flex flex-col w-96 bg-white border-l border-gray-200 shadow-lg h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close AI Chat Panel"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Status Area */}
      <div className="p-2 border-b border-gray-200">
        <StatusToolbar
          languageModelStatus={languageModelStatus}
          downloadProgress={downloadProgress}
          onDownloadModel={onDownloadModel}
          onPurgeModel={onPurgeModel}
        />
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <PromptInput onPromptSubmit={onPromptSubmit} />
      </div>
    </div>
  );
};

export default ChatPanel;
