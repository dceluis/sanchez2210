import React from 'react';
import { CheckCircle, Download, Loader2, AlertCircle, Clock, Trash2 } from 'lucide-react';

function StatusToolbar({ languageModelStatus, downloadProgress, onDownloadModel, onPurgeModel }) {
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
        return 'AI Ready';
      case 'ready_to_download':
        return 'AI Ready to Download';
      case 'downloading':
        return `Downloading ${downloadProgress}%`;
      case 'loading_model':
        return 'Loading AI';
      case 'unavailable':
        return 'AI Unavailable';
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
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
      <div className="flex space-x-2">
        {languageModelStatus === 'ready_to_download' && (
          <button
            onClick={onDownloadModel}
            className="p-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            title="Download AI Model"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
        {languageModelStatus === 'available' && (
          <button
            onClick={onPurgeModel}
            className="p-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs"
            title="Purge AI Model Cache"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default StatusToolbar;