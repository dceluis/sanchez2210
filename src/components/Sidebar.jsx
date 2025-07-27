import React from 'react';
import FilesPanel from './FilesPanel';
import SettingsPanel from './SettingsPanel';
import { Folder, X } from 'lucide-react';

function Sidebar({ activeSection, onSectionChange, isSettingsViewActive, toggleSettingsView, ...props }) {
  if (isSettingsViewActive) {
    return (
      <div className="h-full w-80 flex flex-col bg-bg-primary">
        <div className="p-2 border-b border-border-primary flex items-center justify-between">
          <h2 className="text-md font-semibold text-text-primary uppercase tracking-wider p-2">
            Settings
          </h2>
          <button onClick={toggleSettingsView} className="p-2 rounded-full hover:bg-interactive-hover">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SettingsPanel
            languageModelStatus={props.languageModelStatus}
            downloadProgress={props.downloadProgress}
            onDownloadModel={props.onDownloadModel}
            onPurgeModel={props.onPurgeModel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-64 flex flex-col bg-bg-primary">
      {/* 1. Permanent Header */}
      <div className="p-2 border-b border-border-primary">
        <div className="flex items-center p-2">
          <h2 className="text-md font-semibold text-text-primary uppercase tracking-wider">
            Documents
          </h2>
        </div>
      </div>

      {/* 2. Dynamic Content Area */}
      <div className="flex-1 overflow-y-auto">
        <FilesPanel
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      </div>
    </div>
  );
}

export default Sidebar;
