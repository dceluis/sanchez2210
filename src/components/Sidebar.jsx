import React from 'react';
import StatusToolbar from './StatusToolbar';

function Sidebar({ activeSection, onSectionChange, languageModelStatus, downloadProgress, onDownloadModel }) {
  const sections = [
    { id: 'about', label: 'About', file: 'about.md' },
    { id: 'projects', label: 'Projects', file: 'projects.md' },
    { id: 'testimonials', label: 'Testimonials', file: 'testimonials.md' },
    { id: 'contact', label: 'Contact', file: 'contact.md' }
  ];

  return (
    <div className="size-full bg-white overflow-y-scroll flex flex-col">
      <div className="flex-1 p-6">
        {/* Profile Section */}
        <div className="flex items-center mb-6">
          <img 
            className="w-12 h-12 rounded-full mr-3" 
            src="/img/portrait_small.jpeg" 
            alt="Luis Sanchez" 
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Luis Sanchez</h2>
            <p className="text-sm text-gray-600">Software Engineer</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-200"></div>

        {/* Explorer Section */}
        <nav className="space-y-2 mt-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeSection === section.id
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
      
      <StatusToolbar 
        languageModelStatus={languageModelStatus}
        downloadProgress={downloadProgress}
        onDownloadModel={onDownloadModel}
      />
    </div>
  );
}

export default Sidebar;
