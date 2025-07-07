import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import ConversationPopup from './components/ConversationPopup';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [showConversationPopup, setShowConversationPopup] = useState(false);

  const handlePromptSubmit = (prompt) => {
    console.log('Prompt submitted:', prompt);
    setShowConversationPopup(true);
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
          <ContentArea 
            activeSection={activeSection} 
            onPromptSubmit={handlePromptSubmit}
          />
        </div>
        
        <ConversationPopup 
          isOpen={showConversationPopup}
          onClose={() => setShowConversationPopup(false)}
        />
      </div>
    </div>
  );
}

export default App;
