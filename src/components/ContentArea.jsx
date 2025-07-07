import React, { useState, useEffect, useRef } from 'react';
import ViewModeSwitcher from './ViewModeSwitcher';
import ContentDisplay from './ContentDisplay';
import PromptInput from './PromptInput';

function ContentArea({ activeSection, onPromptSubmit, onDownloadModel, languageModelStatus, downloadProgress }) {
  const [allSectionData, setAllSectionData] = useState({});
  const [loading, setLoading] = useState(true);
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('portfolioSectionData');
      if (savedData) {
        setAllSectionData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever allSectionData changes
  useEffect(() => {
    try {
      localStorage.setItem('portfolioSectionData', JSON.stringify(allSectionData));
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  }, [allSectionData]);

  // Get current section data
  const currentSectionData = allSectionData[activeSection] || { content: '', viewMode: 'preview' };
  const currentSectionContent = currentSectionData.content;
  const currentSectionViewMode = currentSectionData.viewMode;

  // Update section data
  const updateSection = (updates) => {
    setAllSectionData(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        ...updates
      }
    }));
  };

  useEffect(() => {
    const loadMarkdownContent = async () => {
      setLoading(true);
      try {
        // Check if we already have content for this section
        if (currentSectionContent) {
          setLoading(false);
          return;
        }

        // Fetch content if we don't have it
        const response = await fetch(`/content/${activeSection}.md`);
        if (response.ok) {
          const content = await response.text();
          updateSection({ content, viewMode: 'preview' });
        } else {
          updateSection({ content: '# Content not found', viewMode: 'preview' });
        }
      } catch (error) {
        console.error('Failed to load markdown content:', error);
        updateSection({ content: '# Error loading content', viewMode: 'preview' });
      } finally {
        setLoading(false);
      }
    };

    if (activeSection) {
      loadMarkdownContent();
    }
  }, [activeSection, currentSectionContent]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col bg-white">
      {/* View Mode Switcher */}
      <div className="flex flex-none justify-end p-2">
        <ViewModeSwitcher 
          mode={currentSectionViewMode} 
          onModeChange={(mode) => updateSection({ viewMode: mode })} 
        />
      </div>
      
      <div className="flex flex-1 overflow-scroll">
        <ContentDisplay
          viewMode={currentSectionViewMode}
          content={currentSectionContent}
          onContentChange={(newContent) => updateSection({ content: newContent })}
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
