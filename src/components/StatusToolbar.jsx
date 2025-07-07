import React, { useState } from 'react';
import { CheckCircle, Download, Loader2, AlertCircle, Clock } from 'lucide-react';

function StatusToolbar({ languageModelStatus, downloadProgress, onDownloadModel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        return 'AI Available';
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

  const handleDownload = () => {
    onDownloadModel();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              {getStatusIcon()}
              <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                The AI assistant can help answer questions about Luis's work experience, 
                projects, and professional background based on the information in this portfolio.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Disclaimer:</strong> The AI assistant runs locally in your browser. 
                  No data is sent to external servers. The model download is approximately 
                  100MB and may take a few minutes depending on your connection.
                </p>
              </div>

              <div className="text-sm text-gray-500">
                <p><strong>Current Status:</strong> {getStatusText()}</p>
                {languageModelStatus === 'downloading' && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              
              {languageModelStatus === 'ready_to_download' && (
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download AI</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StatusToolbar;