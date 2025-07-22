import React from 'react';
import { MessageSquare, Folder, Settings } from 'lucide-react';

const views = [
  { id: 'files', label: 'Files Panel', Icon: Folder },
  { id: 'chat', label: 'AI Chat Panel', Icon: MessageSquare },
  { id: 'settings', label: 'Settings Panel', Icon: Settings },
];

const ActivityBar = ({ onViewChange, activeView }) => {
  return (
    <div className="flex flex-col justify-start h-full w-12">
      {views.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`inline-flex justify-around p-2 ring-inset hover:bg-interactive-hover focus:outline-none focus:ring-2 focus:ring-border-interactive ${
            activeView === id ? 'bg-interactive-hover' : ''
          }`}
          aria-label={`Show ${label}`}
        >
          <Icon className="w-6 h-6 text-text-secondary" />
        </button>
      ))}
    </div>
  );
};

export default ActivityBar;
