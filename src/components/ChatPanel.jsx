import React from 'react';
import StatusToolbar from './StatusToolbar';
import PromptInput from './PromptInput';

const ChatPanel = ({
  messages,
  languageModelStatus,
  downloadProgress,
  onDownloadModel,
  onPurgeModel,
  onPromptSubmit,
}) => {
  return (
    <div className="flex flex-col w-84 bg-white shadow-lg h-full">

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
        <PromptInput onPromptSubmit={onPromptSubmit} languageModelStatus={languageModelStatus} />
      </div>
    </div>
  );
};

export default ChatPanel;
