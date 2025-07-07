import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

function ContentArea({ activeSection, viewMode, onPromptSubmit }) {
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [promptValue, setPromptValue] = useState('');
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

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
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex flex-1 justify-around overflow-y-scroll">
        {viewMode === 'edit' ? (
          <div ref={editorRef} className="flex-1 w-full overflow-hidden" />
        ) : (
          <div className="prose prose-lg max-w-4xl h-fit flex-1 py-8">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {editedContent}
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
