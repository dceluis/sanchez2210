import React, { useEffect, useRef } from 'react';

function ProjectModal({ project, isOpen, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && project && project.video && videoRef.current) {
      videoRef.current.src = project.video;
      videoRef.current.load();
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-2xl w-full mx-4">
        <button 
          className="absolute top-4 right-4 text-gray-600 text-2xl font-bold hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <div className="modal-content">
          <h4 className="text-2xl font-semibold text-gray-900 mb-4">{project.modalTitle}</h4>

          {/* Media Item */}
          <div className="mb-6">
            {project.video ? (
              <video 
                ref={videoRef}
                controls 
                preload="auto" 
                className="w-full h-72 object-cover rounded-md border border-gray-200"
              />
            ) : (
              <img 
                src={project.modalImage} 
                alt={project.modalImageAlt} 
                className="w-full h-72 object-cover rounded-md border border-gray-200" 
              />
            )}
            <p className="text-sm text-gray-500 mt-2 italic text-center">{project.mediaCaption}</p>
          </div>

          {/* Description */}
          <div className="text-gray-700 mb-6">
            {project.modalDescription.map((paragraph, index) => (
              <p key={index} className="mb-3" dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>

          {/* Styled Links */}
          <div className="flex flex-col sm:flex-row gap-4">
            {project.links.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center px-4 py-2 rounded-md ${link.className}`}
              >
                <i className={`${link.icon} mr-2`}></i> {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
