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
  onViewChange,
}) => {
  return (
    <div className="flex flex-col w-84 bg-secondary shadow-lg h-full">

      {/* Status Area */}
      <div className="border-b border-border-primary">
        <StatusToolbar
          languageModelStatus={languageModelStatus}
          downloadProgress={downloadProgress}
          onDownloadModel={onDownloadModel}
          onPurgeModel={onPurgeModel}
          onViewChange={onViewChange}
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
                ? 'bg-accent-primary text-text-inverted'
                : 'bg-interactive-idle text-text-primary'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border-primary">
        <PromptInput onPromptSubmit={onPromptSubmit} languageModelStatus={languageModelStatus} />
      </div>
    </div>
  );
};

export default ChatPanel;
