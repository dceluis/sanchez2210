import React, { useRef, useEffect } from 'react';

function ConversationPopup({ isOpen, onClose, messages = [] }) {
  const conversationEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) return null;

  const renderMessage = (message, index) => {
    const isUser = message.sender === 'user';
    const isSystem = message.sender === 'system';
    const isAI = message.sender === 'ai';

    return (
      <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        {!isUser && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
            isSystem ? 'bg-gray-500' : 'bg-indigo-600'
          }`}>
            <span className="text-white text-sm font-medium">
              {isSystem ? 'S' : 'AI'}
            </span>
          </div>
        )}
        
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser 
            ? 'bg-indigo-600 text-white' 
            : isSystem
            ? 'bg-gray-100 text-gray-700 border border-gray-200'
            : 'bg-gray-100 text-gray-700'
        } ${message.isThinking ? 'animate-pulse' : ''}`}>
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        </div>

        {isUser && (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Start a conversation by asking a question below.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {messages.map((message, index) => renderMessage(message, index))}
              <div ref={conversationEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConversationPopup;