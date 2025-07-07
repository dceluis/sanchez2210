import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

// New, dynamic, and smoothly animating ViewModeSwitcher component
function ViewModeSwitcher({ mode, onModeChange }) {
  const previewRef = useRef(null);
  const editRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    // Wait until the refs are attached to an element
    if (!previewRef.current || !editRef.current) return;

    const activeRef = mode === 'preview' ? previewRef : editRef;
    const { offsetWidth, offsetLeft } = activeRef.current;
    const parentPadding = 4; // Corresponds to p-1 (0.25rem * 16px/rem)

    setPillStyle({
      width: `${offsetWidth}px`,
      transform: `translateX(${offsetLeft - parentPadding}px)`,
    });

  }, [mode]);

  return (
    <div className="relative flex w-fit items-center rounded-full bg-gray-200 p-1">
      <button
        ref={editRef}
        onClick={() => onModeChange('edit')}
        // Using longer text to better demonstrate the smooth width change
        className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          mode === 'edit' ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Edit
      </button>
      <button
        ref={previewRef}
        onClick={() => onModeChange('preview')}
        className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          mode === 'preview' ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Preview
      </button>
      {/* The moving pill background with smooth width and position transitions */}
      <div
        className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-white shadow-md transition-all duration-300 ease-in-out"
        style={pillStyle}
      />
    </div>
  );
}


// Updated HeaderArea to use the new ViewModeSwitcher
function HeaderArea({ activeSection, viewMode, onViewModeChange }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-4 py-3 border-b border-gray-300">
      <h1 className="text-lg font-bold text-gray-900 capitalize">{activeSection}</h1>
      <ViewModeSwitcher mode={viewMode} onModeChange={onViewModeChange} />
    </div>
  );
}

// Updated ContentArea with new state management and logic
function ContentArea({ activeSection }) {
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(true);
  // State is now a string 'preview' or 'edit' for clarity
  const [viewMode, setViewMode] = useState('preview'); 
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

  useEffect(() => {
    const loadMarkdownContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/src/content/${activeSection}.md`);
        if (response.ok) {
          const content = await response.text();
          setEditedContent(content);
        } else {
          setEditedContent('# Content not found');
        }
      } catch (error) {
        console.error('Failed to load markdown content:', error);
        setEditedContent('# Error loading content');
      } finally {
        setLoading(false);
      }
    };

    if (activeSection) {
      loadMarkdownContent();
      // Reset to preview mode when switching sections
      setViewMode('preview'); 
    }
  }, [activeSection]);

  useEffect(() => {
    // Create editor only when in 'edit' mode
    if (viewMode === 'edit' && editorRef.current && !editorViewRef.current) {
      const state = EditorState.create({
        doc: editedContent,
        extensions: [
          basicSetup,
          markdown(),
          oneDark,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setEditedContent(update.state.doc.toString());
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
  }, [viewMode, editedContent]); 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-screen border border-gray-300 overflow-hidden">
      <HeaderArea
        activeSection={activeSection}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      {/* Container for content ensures a consistent height */}
      <div className="flex flex-1 flex-col overflow-y-scroll items-center bg-white">
        {viewMode === 'edit' ? (
          <div ref={editorRef} className="flex-1 w-full overflow-hidden" />
        ) : (
          <div className="prose prose-lg max-w-4xl flex-1 py-8">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {editedContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentArea;
