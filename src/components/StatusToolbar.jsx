import React from 'react';
import { CheckCircle, Download, Loader2, AlertCircle, Clock } from 'lucide-react';

function StatusToolbar({ languageModelStatus, downloadProgress, onViewChange }) {
  const getStatusIcon = () => {
    switch (languageModelStatus) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ready_to_download':
        return <Download className="w-4 h-4 text-blue-500" />;
      case 'downloading':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'loading_model':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'unavailable':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (languageModelStatus) {
      case 'available':
        return 'Ready';
      case 'ready_to_download':
        return 'Ready to Download';
      case 'downloading':
        return `Downloading ${downloadProgress}%`;
      case 'loading_model':
        return 'Loading';
      case 'unavailable':
        return 'Unavailable';
      default:
        return 'Checking AI';
    }
  };

  const getStatusColor = () => {
    switch (languageModelStatus) {
      case 'available':
        return 'text-green-600';
      case 'ready_to_download':
        return 'text-blue-600';
      case 'downloading':
        return 'text-blue-600';
      case 'loading_model':
        return 'text-yellow-600';
      case 'unavailable':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <button
      onClick={() => onViewChange('settings')}
      className="flex items-center justify-between w-full p-2 bg-secondary hover:bg-interactive-hover focus:outline-none focus:ring-2 focus:ring-border-interactive"
      aria-label="Open AI Settings"
    >
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
    </button>
  );
}

export default StatusToolbar;
