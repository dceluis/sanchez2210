import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import ConversationPopup from './components/ConversationPopup';
import StatusToolbar from './components/StatusToolbar';
import PromptInput from './components/PromptInput';
import { initWllama, downloadModel, promptWllama } from './lib/wllamaService';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [showConversationPopup, setShowConversationPopup] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [languageModelStatus, setLanguageModelStatus] = useState('checking');
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Initialize wllama service
  useEffect(() => {
    const initializeWllama = async () => {
      const statusCallback = (status) => {
        setLanguageModelStatus(status);
        
        if (status === 'ready_to_download') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'AI assistant is ready to download. Click "Download AI Assistant" to get started.'
          }]);
        } else if (status === 'unavailable') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'AI assistant failed to initialize. Please refresh the page and try again.'
          }]);
        }
      };
      
      try {
        await initWllama(statusCallback);
      } catch (error) {
        console.error('Failed to initialize wllama:', error);
        setLanguageModelStatus('unavailable');
        setConversationHistory(prev => [...prev, {
          sender: 'system',
          text: 'Failed to initialize AI assistant. Please refresh the page and try again.'
        }]);
      }
    };

    initializeWllama();
  }, []);

  const handleDownloadModel = () => {
    if (languageModelStatus === 'ready_to_download') {
      const progressCallback = (progress) => {
        setDownloadProgress(progress);
      };
      
      const statusCallback = (status, progress) => {
        setLanguageModelStatus(status);
        
        if (status === 'downloading' && progress !== undefined) {
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
        } else if (status === 'loading_model') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'Initializing AI model...'
          }]);
        } else if (status === 'available') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'AI assistant is ready! Ask me anything about Luis\'s work and experience.'
          }]);
        } else if (status === 'unavailable') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'Failed to download AI model. Please try again.'
          }]);
        }
      };
      
      downloadModel(progressCallback, statusCallback).catch(error => {
        console.error('Download failed:', error);
      });
    }
  };
  
  const handlePromptSubmit = async (prompt, fileContent) => {
    // Add user message to conversation
    setConversationHistory(prev => [...prev, {
      sender: 'user',
      text: prompt
    }]);

    // Show conversation popup
    setShowConversationPopup(true);

    // Check if model is available
    if (languageModelStatus !== 'available') {
      setConversationHistory(prev => [...prev, {
        sender: 'system',
        text: 'AI assistant is not available right now. Please wait for it to initialize or download the model.'
      }]);
      return;
    }

    // Define callbacks for prompt processing
    const thinkingCallback = () => {
      setConversationHistory(prev => [...prev, {
        sender: 'ai',
        text: 'Thinking...',
        isThinking: true
      }]);
    };
    
    const responseCallback = (response) => {
      setConversationHistory(prev => {
        const newHistory = prev.filter(msg => !msg.isThinking);
        return [...newHistory, {
          sender: 'ai',
          text: response
        }];
      });
    };
    
    const errorCallback = (message) => {
      setConversationHistory(prev => {
        const newHistory = prev.filter(msg => !msg.isThinking);
        return [...newHistory, {
          sender: 'system',
          text: message || 'An error occurred. Please try again.'
        }];
      });
    };
    
    // Send prompt to wllama service
    promptWllama(prompt, fileContent, thinkingCallback, responseCallback, errorCallback);
  };

  return (
    <div className="w-screen h-screen bg-gray-100 p-4">
      <div className="grid grid-rows-[1fr_auto] w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
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
            />
          </div>
        </div>
        
        <div className="grid grid-cols-[256px_1fr] border-t border-gray-200">
          <StatusToolbar 
            languageModelStatus={languageModelStatus}
            downloadProgress={downloadProgress}
            onDownloadModel={handleDownloadModel}
          />
          <PromptInput 
            onPromptSubmit={handlePromptSubmit}
            languageModelStatus={languageModelStatus}
          />
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
