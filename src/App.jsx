import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="flex flex-col min-w-screen min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <ContentArea activeSection={activeSection} />
      </div>
    </div>
  );
}

export default App;
