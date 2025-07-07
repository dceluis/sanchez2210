import React from 'react';

function ProjectCard({ project, onOpenModal }) {
  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    onOpenModal(project);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 w-full">
      <img 
        src={project.image} 
        loading="lazy" 
        alt={project.imageAlt} 
        className="rounded-t-lg w-full object-cover" 
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900 font-normal">{project.title}</h3>
        <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: project.description }} />
        <a 
          href="#" 
          className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
          onClick={handleLearnMoreClick}
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;