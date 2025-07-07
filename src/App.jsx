import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="flex min-w-screen min-h-screen bg-gray-100">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <ContentArea activeSection={activeSection} />
    </div>
  );
}

export default App;
