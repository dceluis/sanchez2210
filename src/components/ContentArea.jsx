import React, { useState, useEffect, useRef } from 'react';
import ViewModeSwitcher from './ViewModeSwitcher';
import ContentDisplay from './ContentDisplay';
import PromptInput from './PromptInput';

// Import markdown content at build time
import aboutContent from '../content/about.md?raw';
import projectsContent from '../public/content/projects.md?raw';
import testimonialsContent from '../public/content/testimonials.md?raw';
import contactContent from '../public/content/contact.md?raw';

// Map section IDs to their content
const sectionContents = {
  about: aboutContent,
  projects: projectsContent,
  testimonials: testimonialsContent,
  contact: contactContent
};

function ContentArea({ activeSection, onPromptSubmit, onDownloadModel, languageModelStatus, downloadProgress }) {
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
    <div className="size-full flex flex-col bg-white">
      {/* View Mode Switcher */}
      <div className="flex flex-none justify-end p-2">
        <ViewModeSwitcher 
          mode={currentSectionViewMode} 
          onModeChange={updateViewMode} 
        />
      </div>
      
      <div className="flex flex-1 overflow-scroll">
        <ContentDisplay
          viewMode={currentSectionViewMode}
          content={currentSectionContent}
          onContentChange={() => {}} // Content is now read-only from imports
          editorRef={editorRef}
          editorViewRef={editorViewRef}
        />
      </div>
      
      <div className="flex-none">
        <PromptInput 
          onPromptSubmit={onPromptSubmit} 
          onDownloadModel={onDownloadModel}
          fileContent={currentSectionContent}
          languageModelStatus={languageModelStatus}
          downloadProgress={downloadProgress}
        />
      </div>
    </div>
  );
}

export default ContentArea;