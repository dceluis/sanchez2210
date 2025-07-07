import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ProjectShowcase from './ProjectShowcase';

function ContentArea({ activeSection }) {
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkdownContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/src/content/${activeSection}.md`);
        if (response.ok) {
          const content = await response.text();
          setMarkdownContent(content);
        } else {
          setMarkdownContent('# Content not found');
        }
      } catch (error) {
        console.error('Error loading markdown:', error);
        setMarkdownContent('# Error loading content');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdownContent();
  }, [activeSection]);

  const renderSectionComponent = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectShowcase />;
      default:
        return null;
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
        <div className="prose prose-lg max-w-none mb-12">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
        
        {renderSectionComponent()}
      </div>
    </div>
  );
}

export default ContentArea;