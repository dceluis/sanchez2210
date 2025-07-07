import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

function ContentDisplay({ viewMode, content, onContentChange, editorRef, editorViewRef }) {
  useEffect(() => {
    // Create editor only when in 'edit' mode
    if (viewMode === 'edit' && editorRef.current && !editorViewRef.current) {
      const state = EditorState.create({
        doc: content,
        extensions: [
          basicSetup,
          markdown(),
          oneDark,
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
  // The effect depends on the viewMode now
  }, [viewMode, content, onContentChange, editorRef, editorViewRef]);

  return (
    <div className="flex flex-1 justify-around">
      {viewMode === 'edit' ? (
        <div ref={editorRef} className="flex-1 w-full overflow-hidden" />
      ) : (
        <div className="prose prose-lg max-w-4xl h-fit flex-1 py-8">
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