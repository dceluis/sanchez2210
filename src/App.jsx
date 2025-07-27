import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ContentArea from './components/ContentArea';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import SettingsPanel from './components/SettingsPanel';
import DraggableWindow from './components/DraggableWindow'; // Import the new component
import { initWllama, downloadModel, promptWllama, purgeModel } from './lib/wllamaService';
import { ThemeProvider } from './contexts/ThemeContext';
import useBreakpoint from './hooks/useBreakpoint';

const useSidebarState = (isDesktop) => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(isDesktop);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    setLeftSidebarOpen(isDesktop);
    if (!isDesktop) {
      setRightSidebarOpen(false);
    }
  }, [isDesktop]);

  const toggleLeftSidebar = () => {
    const newIsOpen = !isLeftSidebarOpen;
    setLeftSidebarOpen(newIsOpen);
    if (!isDesktop && newIsOpen && isRightSidebarOpen) {
      setRightSidebarOpen(false);
    }
  };

  const toggleRightSidebar = () => {
    const newIsOpen = !isRightSidebarOpen;
    setRightSidebarOpen(newIsOpen);
    if (!isDesktop && newIsOpen && isLeftSidebarOpen) {
      setLeftSidebarOpen(false);
    }
  };

  const openLeftSidebar = () => {
    setLeftSidebarOpen(true);
  };

  return { isLeftSidebarOpen, isRightSidebarOpen, toggleLeftSidebar, toggleRightSidebar, openLeftSidebar };
};


function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [languageModelStatus, setLanguageModelStatus] = useState('checking');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const isDesktop = useBreakpoint(1024);
  const {
    isLeftSidebarOpen,
    isRightSidebarOpen,
    toggleLeftSidebar,
    toggleRightSidebar,
    openLeftSidebar
  } = useSidebarState(isDesktop);
  const [isSettingsViewActive, setSettingsViewActive] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);
  const dragTimeout = useRef(null);

  const openSettingsView = () => {
    if (!isSettingsViewActive) {
      setSettingsViewActive(true);
      openLeftSidebar();
    }
  };

  const closeSettingsView = () => {
    setSettingsViewActive(false);
  };

  const toggleSettingsView = () => {
    setSettingsViewActive(true);
    if (!isDesktop && isRightSidebarOpen) {
      toggleRightSidebar();
    }
    openLeftSidebar();
  };

  // Initialize wllama service
  useEffect(() => {
    const initializeWllama = async () => {
      const statusCallback = (status) => {
        setLanguageModelStatus(status);
        
        if (status === 'ready_to_download') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'Download the AI model to get started.'
          }]);
        } else if (status === 'available') {
          setConversationHistory(prev => [...prev, {
            sender: 'system',
            text: 'AI assistant is ready! Ask me anything about Luis\'s work and experience.'
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

  const handleTouchStart = (e) => {
    if (isDesktop) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;

    dragTimeout.current = setTimeout(() => {
      isDragging.current = false;
    }, 100);
  };

  const handleTouchMove = (e) => {
    if (isDesktop || !touchStartX.current) return;

    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
      isDragging.current = true;
      clearTimeout(dragTimeout.current);
    }

    if (isDragging.current) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (isDesktop || !isDragging.current) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const swipeThreshold = 50;

    if (deltaX > swipeThreshold) { // Swiping right
      if (isRightSidebarOpen) {
        toggleRightSidebar();
      } else if (!isLeftSidebarOpen) {
        toggleLeftSidebar();
      }
    } else if (deltaX < -swipeThreshold) { // Swiping left
      if (isLeftSidebarOpen) {
        toggleLeftSidebar();
      } else if (!isRightSidebarOpen) {
        toggleRightSidebar();
      }
    }

    touchStartX.current = 0;
    touchStartY.current = 0;
    isDragging.current = false;
  };

  const eventHandlers = !isDesktop ? {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  } : {};

  return (
    <ThemeProvider>
      {/* This div is now the "desktop" background */}
      <div 
        className="w-screen h-screen bg-bg-secondary overflow-hidden"
        {...eventHandlers}
      >
        
        {/* Our new draggable window component */}
        <DraggableWindow 
          title="Luis Sanchez - Portfolio IDE"
          onToggleSettings={toggleSettingsView}
        >
          {/* The original application layout is now a child */}
          <div className="flex flex-row w-full h-full relative">
            {/* Left Sidebar - Mobile: floating, Desktop: static */}
            <div
              className={`
                ${isDesktop ? 'relative' : 'absolute'}
                h-full
                z-20
                transition-transform duration-300 ease-in-out
                ${isDesktop && (isLeftSidebarOpen ? 'block' : 'hidden')}
                ${!isDesktop && (isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full')}
              `}
            >
              <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                isSettingsViewActive={isSettingsViewActive}
                toggleSettingsView={closeSettingsView}
                languageModelStatus={languageModelStatus}
                downloadProgress={downloadProgress}
                onDownloadModel={handleDownloadModel}
                onPurgeModel={handlePurgeModel}
              />
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {!isDesktop && isLeftSidebarOpen && (
              <div
                className="absolute inset-0 z-10"
                onClick={toggleLeftSidebar}
              ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto">
              <ContentArea 
                activeSection={activeSection}
                onToggleSidebar={toggleLeftSidebar}
                isSidebarOpen={isLeftSidebarOpen}
                onToggleRightSidebar={toggleRightSidebar}
                isRightSidebarOpen={isRightSidebarOpen}
              />
            </div>

            {/* Right Sidebar */}
            <div
              className={`
                ${isDesktop ? 'relative' : 'absolute right-0'}
                h-full
                z-20
                transition-transform duration-300 ease-in-out
                ${isDesktop && (isRightSidebarOpen ? 'block' : 'hidden')}
                ${!isDesktop && (isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full')}
              `}
            >
              <RightSidebar
                conversationHistory={conversationHistory}
                languageModelStatus={languageModelStatus}
                downloadProgress={downloadProgress}
                onDownloadModel={handleDownloadModel}
                onPurgeModel={handlePurgeModel}
                onPromptSubmit={handlePromptSubmit}
                toggleSettingsView={toggleSettingsView}
              />
            </div>
          </div>
        </DraggableWindow>

      </div>
    </ThemeProvider>
  );
}

export default App;

