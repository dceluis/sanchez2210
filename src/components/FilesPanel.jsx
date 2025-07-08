import React from 'react';

function FilesPanel({ activeSection, onSectionChange }) {
  const sections = [
    { id: 'about', label: 'About', file: 'about.md' },
    { id: 'projects', label: 'Projects', file: 'projects.md' },
    { id: 'testimonials', label: 'Testimonials', file: 'testimonials.md' },
    { id: 'contact', label: 'Contact', file: 'contact.md' }
  ];

  return (
    <div className="size-full bg-white overflow-y-scroll flex flex-col">

      <div className="flex flex-col flex-1">
        {/* Explorer Section */}
        <nav className="flex-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                activeSection === section.id
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-b border-gray-200"></div>

        {/* Profile Section */}
        <div className="flex items-center p-4">
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
      </div>
    </div>
  );
}

export default FilesPanel;
