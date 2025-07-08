import React from 'react';
import { MessageSquare, Folder } from 'lucide-react';

const ActivityBar = ({ onViewChange, activeView }) => {
  return (
    <div className="flex flex-col items-center justify-start h-full w-12 bg-gray-100 border-l border-gray-200 p-2">
      <button
        onClick={() => onViewChange('files')}
        className={`p-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          activeView === 'files' ? 'bg-gray-200' : ''
        }`}
        aria-label="Show Files Panel"
      >
        <Folder className="w-6 h-6 text-gray-600" />
      </button>
      <button
        onClick={() => onViewChange('chat')}
        className={`mt-2 p-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          activeView === 'chat' ? 'bg-gray-200' : ''
        }`}
        aria-label="Show AI Chat Panel"
      >
        <MessageSquare className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default ActivityBar;
