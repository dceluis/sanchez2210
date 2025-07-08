import React from 'react';
import { Pencil, BookOpen } from 'lucide-react';

function ViewModeSwitcher({ mode, onModeChange }) {
  const handleToggle = () => {
    onModeChange(mode === 'edit' ? 'preview' : 'edit');
  };

  const tooltipText = mode === 'edit' ? 'Switch to Preview Mode' : 'Switch to Edit Mode';

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center group relative"
      title={tooltipText}
    >
      {mode === 'edit' ? (
        <BookOpen className="w-5 h-5 text-gray-700" />
      ) : (
        <Pencil className="w-5 h-5 text-gray-700" />
      )}
      <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {tooltipText}
      </span>
    </button>
  );
}

export default ViewModeSwitcher;