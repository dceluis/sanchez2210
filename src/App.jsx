import React from 'react';
import { useState, useEffect } from 'react';
import ContentArea from './components/ContentArea';
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import { initWllama, downloadModel, promptWllama, purgeModel } from './lib/wllamaService';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [activeView, setActiveView] = useState('files');
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
        } else if (status === 'available') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'AI assistant is ready! Ask me anything about Luis\'s work and experience.'
          }]);
        } else if (status === 'loading_model') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'Loading AI model from cache...'
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
        
        if (status === 'loading_model') {
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

  const handlePurgeModel = async () => {
    try {
      await purgeModel();
      setLanguageModelStatus('ready_to_download');
      setConversationHistory(prev => [...prev, {
        sender: 'system',
        text: 'AI model cache has been purged. You can now re-download the model.'
      }]);
    } catch (error) {
      console.error('Failed to purge model:', error);
      setConversationHistory(prev => [...prev, {
        sender: 'system',
        text: 'Failed to purge AI model from cache. Please try again.'
      }]);
    }
  };
  
  const handlePromptSubmit = async (prompt, fileContent) => {
    // Add user message to conversation
    setConversationHistory(prev => [...prev, {
      sender: 'user',
      text: prompt
    }]);

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
      <div className="flex w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Column 1: Activity Bar */}
        <ActivityBar onViewChange={setActiveView} activeView={activeView} />

        {/* Column 2: Our new, intelligent Sidebar */}
        <Sidebar
          activeView={activeView}
          // Pass ALL the necessary props for both FilesPanel and ChatPanel here
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          conversationHistory={conversationHistory}
          languageModelStatus={languageModelStatus}
          downloadProgress={downloadProgress}
          onDownloadModel={handleDownloadModel}
          onPurgeModel={handlePurgeModel}
          onPromptSubmit={handlePromptSubmit}
        />

        {/* Column 3: Main Content Area */}
        <div className="flex-1 overflow-scroll">
          <ContentArea 
            activeSection={activeSection} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;

