import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

function ContentArea({ activeSection, viewMode }) {
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(true);
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
    <div className="flex flex-1 justify-around overflow-y-scroll bg-white">
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
  );
}

export default ContentArea;
