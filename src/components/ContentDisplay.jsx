import React, { useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import ThemeContext from '../contexts/ThemeContext'; // Import ThemeContext

function ContentDisplay({ viewMode, content, onContentChange, editorRef, editorViewRef }) {
  const { theme } = useContext(ThemeContext); // Use the theme context

  // Determine CodeMirror theme based on app theme
  const isDarkMode = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const editorTheme = isDarkMode ? oneDark : EditorView.baseTheme({}); // Use a basic light theme for now

    // Create editor only when in 'edit' mode
    if (viewMode === 'edit' && editorRef.current && !editorViewRef.current) {
      const state = EditorState.create({
        doc: content,
        extensions: [
          basicSetup,
          markdown(),
          editorTheme, // Apply the determined theme
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onContentChange(update.state.doc.toString());
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
  // The effect depends on the viewMode and theme now
  }, [viewMode, content, onContentChange, editorRef, editorViewRef, theme]); // Add theme to dependencies

  return (
    <div className="flex flex-1 justify-around">
      {viewMode === 'edit' ? (
        <div ref={editorRef} className="flex-1 w-full overflow-hidden" />
      ) : (
        <div className={`prose prose-lg max-w-4xl h-fit flex-1 py-8 ${isDarkMode ? 'prose-invert' : ''}`}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {content}
            </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default ContentDisplay;
