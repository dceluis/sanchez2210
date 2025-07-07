import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

// ViewModeSwitcher component
function ViewModeSwitcher({ mode, onModeChange }) {
  const previewRef = useRef(null);
  const editRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    // Wait until the refs are attached to an element
    if (!previewRef.current || !editRef.current) return;

    const activeRef = mode === 'preview' ? previewRef : editRef;
    const { offsetWidth, offsetLeft } = activeRef.current;
    const parentPadding = 2;

    setPillStyle({
      width: `${offsetWidth}px`,
      transform: `translateX(${offsetLeft - parentPadding}px)`,
    });

  }, [mode]);

  return (
    <div className="relative flex w-fit items-center rounded-full bg-gray-200 p-0.5">
      <button
        ref={editRef}
        onClick={() => onModeChange('edit')}
        className={`relative z-10 rounded-full px-3 py-1 text-xs font-medium transition-colors ${ mode === 'edit' ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800' }`}
      >
        Edit
      </button>
      <button
        ref={previewRef}
        onClick={() => onModeChange('preview')}
        className={`relative z-10 rounded-full px-3 py-1 text-xs font-medium transition-colors ${ mode === 'preview' ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800' }`}
      >
        Preview
      </button>
      {/* The moving pill background with smooth width and position transitions */}
      <div
        className="absolute top-0.5 h-[calc(100%-4px)] rounded-full bg-white shadow-md transition-all duration-300 ease-in-out"
        style={pillStyle}
      />
    </div>
  );
}

function ContentArea({ activeSection, onPromptSubmit }) {
  const [allSectionData, setAllSectionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [promptValue, setPromptValue] = useState('');
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && promptValue.trim()) {
      onPromptSubmit(promptValue);
      setPromptValue('');
    }
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
        const response = await fetch(`/src/content/${activeSection}.md`);
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

  useEffect(() => {
    // Create editor only when in 'edit' mode
    if (currentSectionViewMode === 'edit' && editorRef.current && !editorViewRef.current) {
      const state = EditorState.create({
        doc: currentSectionContent,
        extensions: [
          basicSetup,
          markdown(),
          oneDark,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              updateSection({ content: update.state.doc.toString() });
            }
          }),
          EditorView.theme({
            '&': {
              height: '100%', // Dynamic height to fill parent
              fontSize: '14px'
            },
            '.cm-scroller': {
              overflow: 'auto',
            },
            '.cm-content': {
              padding: '16px'
            },
            '.cm-focused': {
              outline: 'none'
            }
          })
        ]
      });

      editorViewRef.current = new EditorView({
        state,
        parent: editorRef.current
      });
    }

    // The cleanup function will run when viewMode changes from 'edit' to 'preview'
    return () => {
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
        editorViewRef.current = null;
      }
    };
  // The effect depends on the viewMode now
  }, [currentSectionViewMode, currentSectionContent]);

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
      <div className="flex-none justify-end flex p-2">
        <ViewModeSwitcher 
          mode={currentSectionViewMode} 
          onModeChange={(mode) => updateSection({ viewMode: mode })} 
        />
      </div>
      
      <div className="flex flex-1 justify-around">
        {currentSectionViewMode === 'edit' ? (
          <div ref={editorRef} className="flex-1 w-full overflow-hidden" />
        ) : (
          <div className="prose prose-lg max-w-4xl h-fit flex-1 py-8">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {currentSectionContent}
              </ReactMarkdown>
          </div>
        )}
      </div>
      
      {/* Prompt Input Section */}
      <div className="flex-none border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about my work, projects, or experience..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
          <button
            onClick={() => {
              if (promptValue.trim()) {
                onPromptSubmit(promptValue);
                setPromptValue('');
              }
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!promptValue.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentArea;
