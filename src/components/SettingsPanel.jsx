import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const SettingsPanel = ({
  languageModelStatus,
  downloadProgress,
  onDownloadModel,
  onPurgeModel,
}) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="p-4 bg-secondary h-full">
      {/* AI Model Settings */}
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2 text-text-primary">AI Model</h4>
        <p className="text-sm text-text-secondary mb-2">
          The AI model runs locally on your machine. All data remains private and is not sent to any external servers.
        </p>
        <div className="flex space-x-2">
          {languageModelStatus === 'ready_to_download' && (
            <button
              onClick={onDownloadModel}
              className="px-4 py-2 bg-accent-primary text-text-inverted rounded-lg hover:bg-accent-primary-hover"
            >
              Download
            </button>
          )}
          {languageModelStatus === 'available' && (
            <button
              onClick={onPurgeModel}
              className="px-4 py-2 bg-accent-danger text-text-inverted rounded-lg hover:bg-accent-danger-hover"
            >
              Purge
            </button>
          )}
        </div>
        {languageModelStatus === 'downloading' && (
          <div className="mt-2">
            <p className="text-sm text-text-secondary">Downloading model...</p>
            <div className="w-full bg-border-primary rounded-full h-2.5">
              <div
                className="bg-accent-primary-hover h-2.5 rounded-full"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        {languageModelStatus === 'loading_model' && (
          <div className="mt-2">
            <p className="text-sm text-text-secondary">Loading model from cache...</p>
            <div className="w-full bg-border-primary rounded-full h-2.5">
              <div className="bg-accent-primary-hover h-2.5 rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Appearance Settings */}
      <div>
        <h4 className="text-md font-semibold mb-2 text-text-primary">Appearance</h4>
        <div className="inline-flex rounded-lg shadow-sm">
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-lg focus:outline-none transition-colors duration-200 ${
              theme === 'light'
                ? 'bg-accent-primary text-text-inverted'
                : 'bg-interactive-idle border border-border-primary text-text-primary'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 px-4 py-2 text-sm font-medium border-x border-border-primary focus:outline-none transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-accent-primary text-text-inverted'
                : 'bg-interactive-idle border border-border-primary text-text-primary'
            }`}
          >
            Night
          </button>
          <button
            onClick={() => setTheme('auto')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-lg focus:outline-none transition-colors duration-200 ${
              theme === 'auto'
                ? 'bg-accent-primary text-text-inverted'
                : 'bg-interactive-idle border border-border-primary text-text-primary'
            }`}
          >
            Auto
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
