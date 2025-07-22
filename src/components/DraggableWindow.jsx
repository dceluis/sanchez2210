// src/components/DraggableWindow.jsx

import React, { useState, useRef, useEffect } from 'react';

const DraggableWindow = ({ children, title = "Luis Sanchez - AI Portfolio" }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const windowRect = windowRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - windowRect.left,
      y: e.clientY - windowRect.top,
    };
    // Add user-select-none to body to prevent text selection during drag
    document.body.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Remove user-select-none from body
    document.body.style.userSelect = '';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  useEffect(() => {
    // Add global listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]); // Re-attach if isDragging changes, though it's the inner logic that matters

  return (
    <div
      ref={windowRef}
      className="w-[80vw] h-[80vh] min-w-[800px] min-h-[600px] absolute flex flex-col rounded-lg dark:shadow-black shadow-2xl overflow-hidden border border-border-primary"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      {/* Title Bar */}
      <div
        id="window-title-bar"
        className={`flex items-center justify-between w-full h-8 px-3 bg-bg-primary border-b border-border-primary flex-shrink-0 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {/* Mock window controls */}
          <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onMouseDown={(e) => e.stopPropagation()}></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer" onMouseDown={(e) => e.stopPropagation()}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer" onMouseDown={(e) => e.stopPropagation()}></div>
        </div>
        <span className="text-sm text-text-secondary font-medium">{title}</span>
        <div className="w-16"></div> {/* Spacer to balance title */}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
