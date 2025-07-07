import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import ConversationPopup from './components/ConversationPopup';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [showConversationPopup, setShowConversationPopup] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [languageModelStatus, setLanguageModelStatus] = useState('checking');
  const [languageModelSession, setLanguageModelSession] = useState(null);

  // Initialize Language Model
  useEffect(() => {
    let session = null;

    const initializeLanguageModel = async () => {
      try {
        // Check if LanguageModel is available
        if (typeof window.LanguageModel === 'undefined') {
          setLanguageModelStatus('unavailable');
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'AI assistant is not available in this browser. Please use Chrome 138+ with the required hardware specifications.'
          }]);
          return;
        }

        // Check model availability
        const availability = await window.LanguageModel.availability();
        setLanguageModelStatus(availability);

        if (availability === 'unavailable') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'AI assistant is not available on this device. Please check the hardware requirements.'
          }]);
          return;
        }

        if (availability === 'downloadable' || availability === 'downloading') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: availability === 'downloadable' 
              ? 'AI model needs to be downloaded. Starting download...'
              : 'AI model is downloading...'
          }]);
        }

        // Create session with download progress monitoring
        session = await window.LanguageModel.create({
          initialPrompts: [{
            role: 'system',
            content: 'You are a helpful AI assistant for Luis Sanchez\'s portfolio. Answer questions about his work, projects, and experience based on the provided context. Be concise, professional, and helpful.'
          }],
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              const progress = Math.round(e.loaded * 100);
              setConversationHistory(prev => {
                const newHistory = [...prev];
                const lastMessage = newHistory[newHistory.length - 1];
                if (lastMessage && lastMessage.sender === 'system' && lastMessage.text.includes('downloading')) {
                  lastMessage.text = `AI model downloading... ${progress}%`;
                } else {
                  newHistory.push({
                    sender: 'system',
                    text: `AI model downloading... ${progress}%`
                  });
                }
                return newHistory;
              });
            });
          }
        });

        setLanguageModelSession(session);
        setLanguageModelStatus('available');
        setConversationHistory(prev => [...prev, {
          sender: 'system',
          text: 'AI assistant is ready! Ask me anything about Luis\'s work and experience.'
        }]);

      } catch (error) {
        console.error('Failed to initialize language model:', error);
        setLanguageModelStatus('unavailable');
        setConversationHistory(prev => [...prev, {
          sender: 'system',
          text: 'Failed to initialize AI assistant. Please try refreshing the page.'
        }]);
      }
    };

    initializeLanguageModel();

    // Cleanup function
    return () => {
      if (session) {
        session.destroy();
      }
    };
  }, []);

  const handlePromptSubmit = async (prompt, fileContent) => {
    // Add user message to conversation
    setConversationHistory(prev => [...prev, {
      sender: 'user',
      text: prompt
    }]);

    // Show conversation popup
    setShowConversationPopup(true);

    // Check if language model session is available
    if (!languageModelSession || languageModelStatus !== 'available') {
      setConversationHistory(prev => [...prev, {
        sender: 'system',
        text: 'AI assistant is not available right now. Please wait for it to initialize or check your browser compatibility.'
      }]);
      return;
    }

    // Add thinking message
    setConversationHistory(prev => [...prev, {
      sender: 'ai',
      text: 'Thinking...',
      isThinking: true
    }]);

    try {
      // Construct the full prompt with context
      const fullPrompt = `Here is the content of the current section:

${fileContent}

Based on this context, please answer the following question: ${prompt}`;

      // Call the language model
      const response = await languageModelSession.prompt(fullPrompt);

      // Remove thinking message and add AI response
      setConversationHistory(prev => {
        const newHistory = prev.filter(msg => !msg.isThinking);
        return [...newHistory, {
          sender: 'ai',
          text: response
        }];
      });

    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      // Remove thinking message and add error message
      setConversationHistory(prev => {
        const newHistory = prev.filter(msg => !msg.isThinking);
        return [...newHistory, {
          sender: 'system',
          text: 'Sorry, I encountered an error while processing your request. Please try again.'
        }];
      });
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 p-4">
      <div className="flex flex-col w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <div className="h-full w-64 border-r border-gray-200">
            <Sidebar 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
          </div>
          <div className="flex-1 overflow-scroll">
            <ContentArea 
              activeSection={activeSection} 
              onPromptSubmit={handlePromptSubmit}
              languageModelStatus={languageModelStatus}
            />
          </div>
        </div>
        
        <ConversationPopup 
          isOpen={showConversationPopup}
          onClose={() => setShowConversationPopup(false)}
          messages={conversationHistory}
        />
      </div>
    </div>
  );
}

export default App;