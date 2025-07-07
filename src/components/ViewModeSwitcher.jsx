import React, { useState, useEffect, useRef } from 'react';

function ViewModeSwitcher({ mode, onModeChange }) {
  const previewRef = useRef(null);
  const editRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    // Wait until the refs are attached to an element
    if (!previewRef.current || !editRef.current) return;

    const activeRef = mode === 'preview' ? previewRef : editRef;
    const { offsetWidth, offsetLeft } = activeRef.current;
    const parentPadding = 2;

    setPillStyle({
      width: `${offsetWidth}px`,
      transform: `translateX(${offsetLeft - parentPadding}px)`,
    });

  }, [mode]);

  return (
    <div className="relative flex w-fit items-center rounded-full bg-gray-200 p-0.5">
      <button
        ref={editRef}
        onClick={() => onModeChange('edit')}
        className={`relative z-10 rounded-full px-3 py-1 text-xs font-medium transition-colors ${ mode === 'edit' ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800' }`}
      >
        Edit
      </button>
      <button
        ref={previewRef}
        onClick={() => onModeChange('preview')}
        className={`relative z-10 rounded-full px-3 py-1 text-xs font-medium transition-colors ${ mode === 'preview' ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800' }`}
      >
        Preview
      </button>
      {/* The moving pill background with smooth width and position transitions */}
      <div
        className="absolute top-0.5 h-[calc(100%-4px)] rounded-full bg-white shadow-md transition-all duration-300 ease-in-out"
        style={pillStyle}
      />
    </div>
  );
}

export default ViewModeSwitcher;