import React, { useState, useRef, useEffect } from 'react';
import FilesPanel from './FilesPanel';
import ChatPanel from './ChatPanel';
import SettingsPanel from './SettingsPanel';
import { MessageSquare, Folder, ChevronDown, X } from 'lucide-react';

const views = [
  { id: 'files', label: 'Documents', Icon: Folder },
  { id: 'chat', label: 'Chat', Icon: MessageSquare },
];

function Sidebar({ activeView, onViewChange, isSettingsViewActive, toggleSettingsView, ...props }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getTitle = () => {
    const currentView = views.find(v => v.id === activeView);
    return currentView ? currentView.label : '';
  };
  
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);


  if (isSettingsViewActive) {
    return (
      <div className="h-full w-80 flex flex-col bg-bg-primary">
        <div className="p-2 border-b border-border-primary flex items-center justify-between">
          <h2 className="text-md font-semibold text-text-primary uppercase tracking-wider p-2">
            Settings
          </h2>
          <button onClick={toggleSettingsView} className="p-2 rounded-full hover:bg-interactive-hover">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SettingsPanel
            languageModelStatus={props.languageModelStatus}
            downloadProgress={props.downloadProgress}
            onDownloadModel={props.onDownloadModel}
            onPurgeModel={props.onPurgeModel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full ${ activeView === 'files' ? 'w-64' : 'w-80'} flex flex-col bg-bg-primary`}>
      {/* 1. Permanent Header with Dropdown */}
      <div className="p-2 border-b border-border-primary relative" ref={dropdownRef}>
        <button 
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between p-2 rounded-md hover:bg-interactive-hover focus:outline-none focus:ring-2 focus:ring-border-interactive"
        >
          <h2 className="text-md font-semibold text-text-primary uppercase tracking-wider">
            {getTitle()}
          </h2>
          <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 px-2 w-full z-10">
            <div className="bg-interactive-idle border border-border-primary rounded-md shadow-lg dark:shadow-black">
              {views.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    onViewChange(id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center p-2 text-left text-text-primary hover:bg-interactive-hover ${activeView === id ? 'bg-interactive-active' : ''}`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Dynamic Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'files' && (
          <FilesPanel
            activeSection={props.activeSection}
            onSectionChange={props.onSectionChange}
          />
        )}
        {activeView === 'chat' && (
          <ChatPanel
            messages={props.conversationHistory}
            languageModelStatus={props.languageModelStatus}
            downloadProgress={props.downloadProgress}
            onDownloadModel={props.onDownloadModel}
            onPurgeModel={props.onPurgeModel}
            onPromptSubmit={props.onPromptSubmit}
            onViewChange={props.onViewChange}
            toggleSettingsView={toggleSettingsView}
          />
        )}
        
      </div>
    </div>
  );
}

export default Sidebar;
