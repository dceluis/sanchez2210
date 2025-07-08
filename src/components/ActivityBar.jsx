import React from 'react';
import { MessageSquare } from 'lucide-react';

const ActivityBar = ({ onToggleChatPanel }) => {
  return (
    <div className="flex flex-col items-center justify-start h-full w-12 bg-gray-100 border-l border-gray-200 p-2">
      <button
        onClick={onToggleChatPanel}
        className="p-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle AI Chat Panel"
      >
        <MessageSquare className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default ActivityBar;
