import React from 'react';
import FilesPanel from './FilesPanel';
import ChatPanel from './ChatPanel';

// This component receives the active view and all the props needed by its children
function Sidebar({ activeView, ...props }) {
  const getTitle = () => {
    if (activeView === 'files') return 'Explorer';
    if (activeView === 'chat') return 'AI Assistant';
    return ''; // Default case
  };

  return (
    <div className={`h-full ${ activeView === 'files' ? 'w-64' : 'w-80'} flex flex-col bg-white border-r border-gray-200`}>
      {/* 1. Permanent Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-md font-semibold text-gray-800 uppercase tracking-wider">
          {getTitle()}
        </h2>
      </div>

      {/* 2. Dynamic Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'files' && (
          <FilesPanel
            activeSection={props.activeSection}
            onSectionChange={props.onSectionChange}
          />
        )}
        {activeView === 'chat' && (
          <ChatPanel
            messages={props.conversationHistory}
            languageModelStatus={props.languageModelStatus}
            downloadProgress={props.downloadProgress}
            onDownloadModel={props.onDownloadModel}
            onPurgeModel={props.onPurgeModel}
            onPromptSubmit={props.onPromptSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default Sidebar;
