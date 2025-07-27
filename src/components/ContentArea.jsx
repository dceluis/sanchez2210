import React, { useState, useEffect, useRef } from 'react';
import ViewModeSwitcher from './ViewModeSwitcher';
import ContentDisplay from './ContentDisplay';
import { PanelLeft, PanelRight } from 'lucide-react';

// Import markdown content at build time
import aboutContent from '../content/about.md?raw';
import projectsContent from '../content/projects.md?raw';
import testimonialsContent from '../content/testimonials.md?raw';
import contactContent from '../content/contact.md?raw';

// Map section IDs to their content
const sectionContents = {
  about: aboutContent,
  projects: projectsContent,
  testimonials: testimonialsContent,
  contact: contactContent
};

function ContentArea({ activeSection, onToggleSidebar, isSidebarOpen, onToggleRightSidebar, isRightSidebarOpen }) {
  const [viewModes, setViewModes] = useState({});
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

  // Load view modes from localStorage on component mount
  useEffect(() => {
    try {
      const savedViewModes = localStorage.getItem('portfolioViewModes');
      if (savedViewModes) {
        setViewModes(JSON.parse(savedViewModes));
      }
    } catch (error) {
      console.error('Failed to load view modes from localStorage:', error);
    }
  }, []);

  // Save view modes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('portfolioViewModes', JSON.stringify(viewModes));
    } catch (error) {
      console.error('Failed to save view modes to localStorage:', error);
    }
  }, [viewModes]);

  // Get current section data
  const currentSectionContent = sectionContents[activeSection] || '# Content not found';
  const currentSectionViewMode = viewModes[activeSection] || 'preview';

  // Update view mode for current section
  const updateViewMode = (viewMode) => {
    setViewModes(prev => ({
      ...prev,
      [activeSection]: viewMode
    }));
  };

  return (
    <div className="size-full flex flex-col bg-bg-secondary">
      {/* Toolbar */}
      <div className="flex flex-none justify-between p-2">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full hover:bg-interactive-hover transition-colors flex items-center justify-center group relative"
          title="Toggle Sidebar"
        >
          <PanelLeft className="w-5 h-5 text-text-secondary" />
          <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-text-primary text-bg-primary text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Toggle Sidebar
          </span>
        </button>

        {/* empty spacer */}
        <div className="flex-1" />

        {/* View Mode Switcher */}
        <ViewModeSwitcher 
          mode={currentSectionViewMode} 
          onModeChange={updateViewMode} 
        />

        <button
          onClick={onToggleRightSidebar}
          className="p-2 rounded-full hover:bg-interactive-hover transition-colors flex items-center justify-center group relative"
          title="Toggle Chat"
        >
          <PanelRight className="w-5 h-5 text-text-secondary" />
          <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-text-primary text-bg-primary text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Toggle Chat
          </span>
        </button>
      </div>
      
      <div className="flex-1 overflow-auto scrollbar-two ring-inset focus:outline-none focus:ring-2 focus:ring-border-interactive">
        <ContentDisplay
          viewMode={currentSectionViewMode}
          content={currentSectionContent}
          onContentChange={() => {}} // Content is now read-only from imports
          editorRef={editorRef}
          editorViewRef={editorViewRef}
        />
      </div>
    </div>
  );
}

export default ContentArea;