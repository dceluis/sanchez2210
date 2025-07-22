import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const SettingsPanel = ({
  languageModelStatus,
  downloadProgress,
  onDownloadModel,
  onPurgeModel,
}) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const themeOptions = [
    { label: 'Day', value: 'light', colors: ['white', 'gray-200'] },
    { label: 'Night', value: 'dark', colors: ['black', 'gray-800'] },
    { label: 'Auto', value: 'auto', colors: ['white', 'black'] },
  ];

  return (
    <div className="p-4 bg-bg-primary h-full">
      {/* AI Model Settings */}
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2 text-text-primary">AI Model</h4>
        <p className="text-sm text-text-secondary mb-4">
          The AI model runs locally on your machine. All data remains private and is not sent to any external servers.
        </p>
        <div className="flex space-x-2">
          {languageModelStatus === 'ready_to_download' && (
            <button
              onClick={onDownloadModel}
              className="cursor-pointer underline font-bold text-text-secondary hover:text-text-primary"
            >
              <i className="fas fa-download mr-1"></i> Download
            </button>
          )}
          {languageModelStatus === 'available' && (
            <button
              onClick={onPurgeModel}
              className="cursor-pointer underline font-bold text-text-secondary hover:text-text-primary"
            >
              <i className="fas fa-trash-alt mr-1"></i> Purge
            </button>
          )}
        </div>
        {languageModelStatus === 'downloading' && (
          <div className="mt-2">
            <p className="text-sm text-text-secondary">Downloading model...</p>
            <div className="w-full rounded-full h-2.5">
              <div
                className="bg-accent-primary h-2.5 rounded-full"
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
        <p className="text-sm text-text-secondary mb-4">
          Choose the theme for the app. Auto will use your system theme.
        </p>
        <div className="flex space-x-2">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-lg w-24 h-24
                border border-border-primary
                ring-inset ring-transparent
                focus:outline-none focus:ring-2 focus:ring-accent-primary
                transition-colors duration-200
                ${theme === option.value ? 'bg-accent-primary text-white focus:ring-black' : 'bg-interactive-idle text-text-primary'}
              `}
            >
              <div className="flex w-12 h-8 rounded overflow-hidden mb-1 border border-border-secondary">
                <div className={`flex-1 bg-${option.colors[0]}`}></div>
                <div className={`flex-1 bg-${option.colors[1]}`}></div>
              </div>
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
