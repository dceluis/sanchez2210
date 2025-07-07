import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import ConversationPopup from './components/ConversationPopup';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [viewMode, setViewMode] = useState('preview');
  const [showConversationPopup, setShowConversationPopup] = useState(false);

  const handlePromptSubmit = (prompt) => {
    console.log('Prompt submitted:', prompt);
    setShowConversationPopup(true);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <div className="flex-none">
        <Navbar onPromptSubmit={handlePromptSubmit} />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full w-64">
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
        <ContentArea activeSection={activeSection} viewMode={viewMode} />
      </div>
      
      <ConversationPopup 
        isOpen={showConversationPopup}
        onClose={() => setShowConversationPopup(false)}
      />
    </div>
  );
}

export default App;
