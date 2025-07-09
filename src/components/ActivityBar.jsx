import React from 'react';
import { MessageSquare, Folder, Settings } from 'lucide-react';

const ActivityBar = ({ onViewChange, activeView }) => {
  return (
    <div className="flex flex-col items-center justify-start h-full w-12 bg-primary border-l border-border-primary p-2">
      <button
        onClick={() => onViewChange('files')}
        className={`p-2 rounded-lg hover:bg-interactive-hover focus:outline-none focus:ring-2 focus:ring-border-interactive ${
          activeView === 'files' ? 'bg-interactive-hover' : ''
        }`}
        aria-label="Show Files Panel"
      >
        <Folder className="w-6 h-6 text-text-secondary" />
      </button>
      <button
        onClick={() => onViewChange('chat')}
        className={`mt-2 p-2 rounded-lg hover:bg-interactive-hover focus:outline-none focus:ring-2 focus:ring-border-interactive ${
          activeView === 'chat' ? 'bg-interactive-hover' : ''
        }`}
        aria-label="Show AI Chat Panel"
      >
        <MessageSquare className="w-6 h-6 text-text-secondary" />
      </button>
      <button
        onClick={() => onViewChange('settings')}
        className={`mt-2 p-2 rounded-lg hover:bg-interactive-hover focus:outline-none focus:ring-2 focus:ring-border-interactive ${
          activeView === 'settings' ? 'bg-interactive-hover' : ''
        }`}
        aria-label="Show Settings Panel"
      >
        <Settings className="w-6 h-6 text-text-secondary" />
      </button>
    </div>
  );
};

export default ActivityBar;
