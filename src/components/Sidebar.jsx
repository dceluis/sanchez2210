import React from 'react';
import { useState, useEffect, useRef } from 'react';

// ViewModeSwitcher component moved from ContentArea
function ViewModeSwitcher({ mode, onModeChange }) {
  const previewRef = useRef(null);
  const editRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    // Wait until the refs are attached to an element
    if (!previewRef.current || !editRef.current) return;

    const activeRef = mode === 'preview' ? previewRef : editRef;
    const { offsetWidth, offsetLeft } = activeRef.current;
    const parentPadding = 4; // Corresponds to p-1 (0.25rem * 16px/rem)

    setPillStyle({
      width: `${offsetWidth}px`,
      transform: `translateX(${offsetLeft - parentPadding}px)`,
    });

  }, [mode]);

  return (
    <div className="relative flex w-fit items-center rounded-full bg-gray-200 p-1">
      <button
        ref={editRef}
        onClick={() => onModeChange('edit')}
        className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          mode === 'edit' ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Edit
      </button>
      <button
        ref={previewRef}
        onClick={() => onModeChange('preview')}
        className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          mode === 'preview' ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Preview
      </button>
      {/* The moving pill background with smooth width and position transitions */}
      <div
        className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-white shadow-md transition-all duration-300 ease-in-out"
        style={pillStyle}
      />
    </div>
  );
}

function Sidebar({ activeSection, onSectionChange, viewMode, onViewModeChange }) {
  const sections = [
    { id: 'about', label: 'About', file: 'about.md' },
    { id: 'projects', label: 'Projects', file: 'projects.md' },
    { id: 'testimonials', label: 'Testimonials', file: 'testimonials.md' },
    { id: 'contact', label: 'Contact', file: 'contact.md' }
  ];

  return (
    <div className="size-full bg-white overflow-y-scroll">
      <div className="p-6">
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
        <div className="border-b border-gray-200 pb-6 mb-6"></div>
        
        {/* View Mode Switcher */}
        <div className="mb-6 flex justify-center">
          <ViewModeSwitcher mode={viewMode} onModeChange={onViewModeChange} />
        </div>
        
        <nav className="space-y-2">
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
    </div>
  );
}

export default Sidebar;
