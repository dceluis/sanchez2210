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
    <div className="flex flex-col w-84 bg-bg-primary shadow-lg h-full">

      {/* Status Area */}
      <div className="flex-0 border-b border-border-primary">
        <StatusToolbar
          languageModelStatus={languageModelStatus}
          downloadProgress={downloadProgress}
          onDownloadModel={onDownloadModel}
          onPurgeModel={onPurgeModel}
          onViewChange={onViewChange}
        />
      </div>

      {/* Conversation Area */}
      <div className="flex flex-col flex-1 px-4 py-3 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              className={`w-full text-sm font-medium rounded-lg whitespace-pre-wrap ${msg.sender === 'user'
                ? 'px-3 py-2 mb-2 text-text-primary bg-bg-tertiary'
                : 'px-1 py-2 mb-4 text-text-secondary'
              }`}
            >
              {msg.text}
            </div>
          ))}
      </div>

      <div className="flex-0 px-4 pb-3">
        {/* Input Area */}
        <PromptInput onPromptSubmit={onPromptSubmit} languageModelStatus={languageModelStatus} />
      </div>
    </div>
  );
};

export default ChatPanel;
