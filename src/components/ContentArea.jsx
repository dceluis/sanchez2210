import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { EditorView, basicSetup } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

function ContentArea({ activeSection }) {
  const [markdownContent, setMarkdownContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

  useEffect(() => {
    const loadMarkdownContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/src/content/${activeSection}.md`);
        if (response.ok) {
          const content = await response.text();
          setMarkdownContent(content);
          setEditedContent(content);
        } else {
          const fallbackContent = '# Content not found';
          setMarkdownContent(fallbackContent);
          setEditedContent(fallbackContent);
        }
      } catch (error) {
        console.error('Failed to load markdown content:', error);
        const errorContent = '# Error loading content';
        setMarkdownContent(errorContent);
        setEditedContent(errorContent);
      } finally {
        setLoading(false);
      }
    };

    if (activeSection) {
      loadMarkdownContent();
      setIsEditing(false); // Reset to preview mode when switching sections
    }
  }, [activeSection]);

  useEffect(() => {
    if (isEditing && editorRef.current && !editorViewRef.current) {
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
              height: '500px',
              fontSize: '14px'
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

    return () => {
      if (editorViewRef.current && !isEditing) {
        editorViewRef.current.destroy();
        editorViewRef.current = null;
      }
    };
  }, [isEditing, editedContent]);

  const handleToggleEdit = () => {
    if (isEditing && editorViewRef.current) {
      editorViewRef.current.destroy();
      editorViewRef.current = null;
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log('Edited content:', editedContent);
    alert('Changes saved to memory! Note: Changes are not persisted to the actual file and will be lost on page refresh.');
    setIsEditing(false);
    if (editorViewRef.current) {
      editorViewRef.current.destroy();
      editorViewRef.current = null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-64">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeSection}</h1>
          <div className="flex gap-2">
            <button
              onClick={handleToggleEdit}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isEditing
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isEditing ? 'Preview' : 'Edit'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Save
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div ref={editorRef} />
          </div>
        ) : (
          <div className="prose prose-lg max-w-none mb-12">
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