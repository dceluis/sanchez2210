import React from 'react';
import ChatPanel from './ChatPanel';

function RightSidebar({ conversationHistory, languageModelStatus, downloadProgress, onDownloadModel, onPurgeModel, onPromptSubmit, toggleSettingsView }) {
  return (
    <div className="h-full w-80 flex flex-col bg-bg-primary border-l border-border-primary">
      <div className="p-2 border-b border-border-primary flex items-center">
        <h2 className="text-md font-semibold text-text-primary uppercase tracking-wider p-2">
          Chat
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatPanel
          messages={conversationHistory}
          languageModelStatus={languageModelStatus}
          downloadProgress={downloadProgress}
          onDownloadModel={onDownloadModel}
          onPurgeModel={onPurgeModel}
          onPromptSubmit={onPromptSubmit}
          toggleSettingsView={toggleSettingsView}
        />
      </div>
    </div>
  );
}

export default RightSidebar;
