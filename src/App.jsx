import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <div className="flex-none">
        <Navbar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full w-64">
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>
        <ContentArea activeSection={activeSection} />
      </div>
    </div>
  );
}

export default App;
