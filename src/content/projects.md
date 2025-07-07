# Project Showcase

Here are some of the projects I've built in my road to learn AI.

## VacoCam

**Vision-Assisted Camera Orientation**

Generate tracked sports video using AI vision.

<img src="https://socialify.git.ci/dceluis/vacocam_render/image?description=1&font=Inter&language=1&name=1&owner=1&pattern=Plus&stargazers=1&theme=Light" alt="VacoCam Project" style="width: 100%; border-radius: 8px; margin-bottom: 16px;" />

<video controls preload="auto" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 8px;" src="/videos/vacocam_demo.mp4"></video>

*VacoCam demonstration video.*

VacoCam uses a Visual Large Language Model to generate focused sports video from unfocused raw footage. I learned how to maintain an object detection dataset and train and evaluate a custom YoloV8 model.

The main challenge was figuring out how to present the tracked information to the VLLMs AND evaluate the performance of different approaches. I created a custom benchmark that allowed me to try different methods and read many papers on arXiv to find inspiration.

I wrote this project when I knew absolutely nothing about LLMs or AI models in general. Used Label Studio, Weights & Biases, and learned Python for this project.

This was my first introduction into the field and I challenged myself to learn through a moderately ambitious project.

Built with **YoloV8** for object detection, **Gemini 1.0** for visual understanding, and **ffmpeg** for video rendering.

<a href="https://github.com/dceluis/vacocam_render" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 6px; background-color: #1f2937; color: white; text-decoration: none; margin-right: 16px; margin-bottom: 8px;">
  <i class="fab fa-github" style="margin-right: 8px;"></i> View on GitHub
</a>
<a href="https://x.com/dceluis/status/1748170461941202954" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 6px; background-color: #4f46e5; color: white; text-decoration: none; margin-bottom: 8px;">
  <i class="fab fa-twitter" style="margin-right: 8px;"></i> See Twitter Thread
</a>

---

## LibreAgent

**A long-lived reasoning agent that stores memories as a living entity.**

<img src="/img/libre_agent_bot.png" alt="LibreAgent Bot" style="width: 100%; border-radius: 8px; margin-bottom: 16px;" />

<img src="/img/libre_agent.png" alt="LibreAgent Demo" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 8px;" />

*LibreAgent running as a Telegram bot.*

LibreAgent is a long-lived agentic system that gathers and refines memories to feel like a living being.

I started this project initially unaware of agentic frameworks, so it took me quite a while to get it to work properly as I was encountering the agentic challenges these frameworks solve.

When I encountered established frameworks later, I recognized their strengths and selectively integrated key insights, while preserving the unique elements that define LibreAgent.

Built with **Gemini 2.0 Flash** for reasoning, **Aiogram** for creating the Telegram bot, and **OpenTelemetry** for instrumentation.

<a href="https://github.com/dceluis/libre_agent" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 6px; background-color: #1f2937; color: white; text-decoration: none; margin-bottom: 8px;">
  <i class="fab fa-github" style="margin-right: 8px;"></i> View on GitHub
</a>

---

## Phone Operator

**An MCP server to control your phone through any LLM chat app.**

<img src="/img/phone_operator.png" alt="Phone Operator screenshot" style="width: 100%; border-radius: 8px; margin-bottom: 16px;" />

<img src="/img/phone_operator.png" alt="Phone Operator screenshot" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 8px;" />

*Phone Operator running.*

Phone Operator bridges AI assistants and automating your phone capabilities. Allowing tools like Claude, Cursor, and any MCP compatible client operate on your phone.

This project was built over a weekend for Toolhouse.ai and pulsemcp.com's Hackathon, and won third place among 23 participants.

Built with **Python**, **Termux**, and **Tasker**.

<a href="https://github.com/dceluis/mcp-hackathon" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 6px; background-color: #1f2937; color: white; text-decoration: none; margin-bottom: 8px;">
  <i class="fab fa-github" style="margin-right: 8px;"></i> View on GitHub
</a>