// src/components/ProjectShowcase.jsx

import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 'vacocam',
      image: 'https://socialify.git.ci/dceluis/vacocam_render/image?description=1&font=Inter&language=1&name=1&owner=1&pattern=Plus&stargazers=1&theme=Light',
      imageAlt: 'VacoCam Project',
      title: 'VacoCam',
      description: 'Vision-Assisted Camera Orientation.<br>Generate tracked sports video using AI vision.',
      modalTitle: 'Vision-Assisted Camera Orientation',
      video: 'videos/vacocam_demo.mp4',
      mediaCaption: 'VacoCam demonstration video.',
      modalDescription: [
        'VacoCam uses a Visual Large Language Model to generate focused sports video from unfocused raw footage. I learned how to maintain an object detection dataset and train and evaluate a custom YoloV8 model.',
        'The main challenge was figuring out how to present the tracked information to the VLLMs AND evaluate the performance of different approaches. I created a custom benchmark that allowed me to try different methods and read many papers on arXiv to find inspiration.',
        'I wrote this project when I knew absolutely nothing about LLMs or AI models in general. Used Label Studio, Weights & Biases, and learned Python for this project.',
        'This was my first introduction into the field and I challenged myself to learn through a moderately ambitious project.',
        'Built with <span class="font-medium text-indigo-600">YoloV8</span> for object detection, <span class="font-medium text-indigo-600">Gemini 1.0</span> for visual understanding, and <span class="font-medium text-indigo-600">ffmpeg</span> for video rendering.'
      ],
      links: [
        {
          url: 'https://github.com/dceluis/vacocam_render',
          text: 'View on GitHub',
          icon: 'fab fa-github',
          className: 'bg-gray-800 text-white'
        },
        {
          url: 'https://x.com/dceluis/status/1748170461941202954',
          text: 'See Twitter Thread',
          icon: 'fab fa-twitter',
          className: 'bg-indigo-600 text-white'
        }
      ]
    },
    {
      id: 'libreagent',
      image: '/img/libre_agent_bot.png',
      imageAlt: 'Task Management App Placeholder',
      title: 'LibreAgent',
      description: 'A long-lived reasoning agent that stores memories as a living entity.',
      modalTitle: 'LibreAgent',
      modalImage: '/img/libre_agent.png',
      modalImageAlt: 'Task Management App Demo',
      mediaCaption: 'LibreAgent running as a Telegram bot.',
      modalDescription: [
        'LibreAgent is a long-lived agentic system that gathers and refines memories to feel like a living being.',
        'I started this project initially unaware of agentic frameworks, so it took me quite a while to get it to work properly as I was encountering the agentic challenges these frameworks solve.',
        'When I encountered established frameworks later, I recognized their strengths and selectively integrated key insights, while preserving the unique elements that define LibreAgent.',
        'Built with <span class="font-medium text-indigo-600">Gemini 2.0 Flash</span> for reasoning, <span class="font-medium text-indigo-600">Aiogram</span> for creating the Telegram bot, and <span class="font-medium text-indigo-600">OpenTelemetry</span> for instrumentation.'
      ],
      links: [
        {
          url: 'https://github.com/dceluis/libre_agent',
          text: 'View on GitHub',
          icon: 'fab fa-github',
          className: 'bg-gray-800 text-white'
        }
      ]
    },
    {
      id: 'phoneoperator',
      image: '/img/phone_operator.png',
      imageAlt: 'Phone Operator screenshot',
      title: 'Phone Operator',
      description: 'An MCP server to control your phone through any LLM chat app.',
      modalTitle: 'Phone Operator',
      modalImage: '/img/phone_operator.png',
      modalImageAlt: 'Phone Operator screenshot',
      mediaCaption: 'Phone Operator running.',
      modalDescription: [
        'Phone Operator bridges AI assistants and automating your phone capabilities. Allowing tools like Claude, Cursor, and any MCP compatible client operate on your phone.',
        'This project was built over a weekend for Toolhouse.ai and pulsemcp.com\'s Hackathon, and won third place among 23 participants.',
        'Built with <span class="font-medium text-indigo-600">Python</span>, <span class="font-medium text-indigo-600">Termux</span>, and <span class="font-medium text-indigo-600">Tasker</span>.'
      ],
      links: [
        {
          url: 'https://github.com/dceluis/mcp-hackathon',
          text: 'View on GitHub',
          icon: 'fab fa-github',
          className: 'bg-gray-800 text-white'
        }
      ]
    }
  ];

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="mt-32" id="projects">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl sm:tracking-tight font-normal">
          Project Showcase
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
          Here are some of the projects I've built in my road to learn AI.
        </p>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onOpenModal={handleOpenModal} 
            />
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default ProjectShowcase;
