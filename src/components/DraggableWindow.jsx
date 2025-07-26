// src/components/DraggableWindow.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Settings } from 'lucide-react';
import useBreakpoint from '../hooks/useBreakpoint';

const DraggableWindow = ({ children, title = "Luis Sanchez - AI Portfolio", onToggleSettings }) => {
  const isDesktop = useBreakpoint(1024);
  const [position, setPosition] = useState(null);
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
    setPosition(null);
  }, [isDesktop]);

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
      className="
        rounded-lg dark:shadow-black shadow-2xl border border-border-primary
        flex flex-col overflow-hidden
        w-vw h-dvh
        lg:left-[10vw] lg:top-[5vh] lg:w-[80vw] lg:h-[90vh]
        lg:absolute
      "
      style={ (isDesktop && position) ? { top: `${position.y}px`, left: `${position.x}px` } : {}}
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
        <div className="w-16 flex justify-end">
          <button 
            onClick={onToggleSettings} 
            className="p-1 rounded-full hover:bg-interactive-hover"
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Settings"
          >
            <Settings className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
