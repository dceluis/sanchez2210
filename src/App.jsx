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
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [worker, setWorker] = useState(null);

  // Initialize wllama Worker
  useEffect(() => {
    let workerInstance = null;

    const initializeWorker = () => {
      try {
        // Create worker
        workerInstance = new Worker(new URL('./wllama.worker.js', import.meta.url), {
          type: 'module'
        });
        
        setWorker(workerInstance);
        
        // Set up message handler
        workerInstance.onmessage = (e) => {
          const { type, status, progress, response, message } = e.data;
          
          switch (type) {
            case 'status':
              setLanguageModelStatus(status);
              
              if (status === 'downloading' && progress !== undefined) {
                setDownloadProgress(progress);
                console.log(`AI model download progress: ${progress}%`);
                
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
              } else if (status === 'ready_to_download') {
                setConversationHistory(prev => [...prev, {
                  sender: 'system',
                  text: 'AI assistant is ready to download. Click "Download AI Assistant" to get started.'
                }]);
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
              }
              break;
              
            case 'thinking':
              setConversationHistory(prev => [...prev, {
                sender: 'ai',
                text: 'Thinking...',
                isThinking: true
              }]);
              break;
              
            case 'response':
              setConversationHistory(prev => {
                const newHistory = prev.filter(msg => !msg.isThinking);
                return [...newHistory, {
                  sender: 'ai',
                  text: response
                }];
              });
              break;
              
            case 'error':
              setConversationHistory(prev => {
                const newHistory = prev.filter(msg => !msg.isThinking);
                return [...newHistory, {
                  sender: 'system',
                  text: message || 'An error occurred. Please try again.'
                }];
              });
              setLanguageModelStatus('unavailable');
              break;
          }
        };
        
        workerInstance.onerror = (error) => {
          console.error('Worker error:', error);
          setLanguageModelStatus('unavailable');
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'AI assistant failed to initialize. Please refresh the page and try again.'
          }]);
        };
        
        // Initialize the worker
        workerInstance.postMessage({ type: 'init' });

      } catch (error) {
        console.error('Failed to initialize worker:', error);
        setLanguageModelStatus('unavailable');
        setConversationHistory(prev => [...prev, {
          sender: 'system',
          text: 'Failed to initialize AI assistant. Please refresh the page and try again.'
        }]);
      }
    };

    initializeWorker();

    // Cleanup function
    return () => {
      if (workerInstance) {
        workerInstance.terminate();
      }
    };
  }, []);

  const handleDownloadModel = () => {
    if (worker && languageModelStatus === 'ready_to_download') {
      worker.postMessage({ type: 'download' });
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

    // Check if worker and model are available
    if (!worker || languageModelStatus !== 'available') {
      setConversationHistory(prev => [...prev, {
        sender: 'system',
        text: 'AI assistant is not available right now. Please wait for it to initialize or download the model.'
      }]);
      return;
    }

    // Send prompt to worker
    worker.postMessage({ 
      type: 'prompt', 
      data: { prompt, context: fileContent } 
    });
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
              onDownloadModel={handleDownloadModel}
              languageModelStatus={languageModelStatus}
              downloadProgress={downloadProgress}
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
