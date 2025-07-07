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
    <div className="size-full bg-white shadow-lg overflow-y-scroll">
      <div className="flex flex-col size-full p-6">
        <nav className="flex-1 space-y-2">
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
        <div className="mt-6 flex justify-center">
          <ViewModeSwitcher mode={viewMode} onModeChange={onViewModeChange} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
