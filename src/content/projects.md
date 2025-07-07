# Project Showcase

Here are some of the projects I've built in my road to learn AI.

<section class="mt-16" id="projects">
  <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
    <div class="grid gap-8 lg:grid-cols-1">

## VacoCam

<div class="bg-white shadow-lg rounded-lg border border-gray-200 p-6 w-full mb-8">
  <img 
    src="https://socialify.git.ci/dceluis/vacocam_render/image?description=1&font=Inter&language=1&name=1&owner=1&pattern=Plus&stargazers=1&theme=Light" 
    loading="lazy" 
    alt="VacoCam Project" 
    class="rounded-t-lg w-full object-cover mb-4" 
  />
  
  <h3 class="text-xl font-semibold text-gray-900 font-normal mb-4">Vision-Assisted Camera Orientation</h3>
  
  <p class="text-gray-600 mb-4">Generate tracked sports video using AI vision.</p>
  
  <video 
    controls 
    preload="auto" 
    class="w-full h-72 object-cover rounded-md border border-gray-200 mb-4"
    src="/videos/vacocam_demo.mp4"
  ></video>
  <p class="text-sm text-gray-500 mb-4 italic text-center">VacoCam demonstration video.</p>

  <div class="text-gray-700 mb-6">
    <p class="mb-3">VacoCam uses a Visual Large Language Model to generate focused sports video from unfocused raw footage. I learned how to maintain an object detection dataset and train and evaluate a custom YoloV8 model.</p>
    
    <p class="mb-3">The main challenge was figuring out how to present the tracked information to the VLLMs AND evaluate the performance of different approaches. I created a custom benchmark that allowed me to try different methods and read many papers on arXiv to find inspiration.</p>
    
    <p class="mb-3">I wrote this project when I knew absolutely nothing about LLMs or AI models in general. Used Label Studio, Weights & Biases, and learned Python for this project.</p>
    
    <p class="mb-3">This was my first introduction into the field and I challenged myself to learn through a moderately ambitious project.</p>
    
    <p class="mb-3">Built with <span class="font-medium text-indigo-600">YoloV8</span> for object detection, <span class="font-medium text-indigo-600">Gemini 1.0</span> for visual understanding, and <span class="font-medium text-indigo-600">ffmpeg</span> for video rendering.</p>
  </div>

  <div class="flex flex-col sm:flex-row gap-4">
    <a 
      href="https://github.com/dceluis/vacocam_render" 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex items-center justify-center px-4 py-2 rounded-md bg-gray-800 text-white"
    >
      <i class="fab fa-github mr-2"></i> View on GitHub
    </a>
    <a 
      href="https://x.com/dceluis/status/1748170461941202954" 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white"
    >
      <i class="fab fa-twitter mr-2"></i> See Twitter Thread
    </a>
  </div>
</div>

## LibreAgent

<div class="bg-white shadow-lg rounded-lg border border-gray-200 p-6 w-full mb-8">
  <img 
    src="/img/libre_agent_bot.png" 
    loading="lazy" 
    alt="LibreAgent Bot" 
    class="rounded-t-lg w-full object-cover mb-4" 
  />
  
  <h3 class="text-xl font-semibold text-gray-900 font-normal mb-4">LibreAgent</h3>
  
  <p class="text-gray-600 mb-4">A long-lived reasoning agent that stores memories as a living entity.</p>
  
  <img 
    src="/img/libre_agent.png" 
    alt="LibreAgent Demo" 
    class="w-full h-72 object-cover rounded-md border border-gray-200 mb-4" 
  />
  <p class="text-sm text-gray-500 mb-4 italic text-center">LibreAgent running as a Telegram bot.</p>

  <div class="text-gray-700 mb-6">
    <p class="mb-3">LibreAgent is a long-lived agentic system that gathers and refines memories to feel like a living being.</p>
    
    <p class="mb-3">I started this project initially unaware of agentic frameworks, so it took me quite a while to get it to work properly as I was encountering the agentic challenges these frameworks solve.</p>
    
    <p class="mb-3">When I encountered established frameworks later, I recognized their strengths and selectively integrated key insights, while preserving the unique elements that define LibreAgent.</p>
    
    <p class="mb-3">Built with <span class="font-medium text-indigo-600">Gemini 2.0 Flash</span> for reasoning, <span class="font-medium text-indigo-600">Aiogram</span> for creating the Telegram bot, and <span class="font-medium text-indigo-600">OpenTelemetry</span> for instrumentation.</p>
  </div>

  <div class="flex flex-col sm:flex-row gap-4">
    <a 
      href="https://github.com/dceluis/libre_agent" 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex items-center justify-center px-4 py-2 rounded-md bg-gray-800 text-white"
    >
      <i class="fab fa-github mr-2"></i> View on GitHub
    </a>
  </div>
</div>

## Phone Operator

<div class="bg-white shadow-lg rounded-lg border border-gray-200 p-6 w-full mb-8">
  <img 
    src="/img/phone_operator.png" 
    loading="lazy" 
    alt="Phone Operator screenshot" 
    class="rounded-t-lg w-full object-cover mb-4" 
  />
  
  <h3 class="text-xl font-semibold text-gray-900 font-normal mb-4">Phone Operator</h3>
  
  <p class="text-gray-600 mb-4">An MCP server to control your phone through any LLM chat app.</p>
  
  <img 
    src="/img/phone_operator.png" 
    alt="Phone Operator screenshot" 
    class="w-full h-72 object-cover rounded-md border border-gray-200 mb-4" 
  />
  <p class="text-sm text-gray-500 mb-4 italic text-center">Phone Operator running.</p>

  <div class="text-gray-700 mb-6">
    <p class="mb-3">Phone Operator bridges AI assistants and automating your phone capabilities. Allowing tools like Claude, Cursor, and any MCP compatible client operate on your phone.</p>
    
    <p class="mb-3">This project was built over a weekend for Toolhouse.ai and pulsemcp.com's Hackathon, and won third place among 23 participants.</p>
    
    <p class="mb-3">Built with <span class="font-medium text-indigo-600">Python</span>, <span class="font-medium text-indigo-600">Termux</span>, and <span class="font-medium text-indigo-600">Tasker</span>.</p>
  </div>

  <div class="flex flex-col sm:flex-row gap-4">
    <a 
      href="https://github.com/dceluis/mcp-hackathon" 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex items-center justify-center px-4 py-2 rounded-md bg-gray-800 text-white"
    >
      <i class="fab fa-github mr-2"></i> View on GitHub
    </a>
  </div>
</div>

    </div>
  </div>
</section>