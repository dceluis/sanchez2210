import React from 'react';

function Navbar() {
  return (
    <div className="size-full bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center">
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

export default Navbar;
