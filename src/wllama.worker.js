import { Wllama } from '@wllama/wllama';
import singleThreadWasm from '@wllama/wllama/esm/single-thread/wllama.wasm?url';
import multiThreadWasm from '@wllama/wllama/esm/multi-thread/wllama.wasm?url';

let wllama = null;
let isModelLoaded = false;

// Model configuration
const HF_REPO = 'bartowski/Llama-3.2-1B-Instruct-GGUF';
const MODEL_FILE = 'Llama-3.2-1B-Instruct-Q4_K_M.gguf';
const MODEL_CONFIG = {
  seed: -1,
  n_threads: navigator.hardwareConcurrency || 4,
  n_ctx: 4096,
  f16_kv: true,
  logits_all: false,
  vocab_only: false,
  use_mlock: false,
  embedding: false
};

// Initialize wllama
async function initializeWllama() {
  try {
    if (!wllama) {
      // Use locally embedded WASM files
      wllama = new Wllama({
        pathConfig: {
          'single-thread/wllama.wasm': singleThreadWasm,
          'multi-thread/wllama.wasm': multiThreadWasm,
        }
      });
    }
    return true;
  } catch (error) {
    console.error('Failed to initialize wllama:', error);
    return false;
  }
}

// Load model from Hugging Face
async function loadModel() {
  try {
    postMessage({ type: 'status', status: 'loading_model' });
    
    // Progress callback for download tracking
    const progressCallback = ({ loaded, total }) => {
      const progress = Math.round((loaded / total) * 100);
      console.log(`AI model download progress: ${progress}%`);
      postMessage({ type: 'status', status: 'downloading', progress });
    };

    // Load model from Hugging Face with progress tracking
    await wllama.loadModelFromHF(HF_REPO, MODEL_FILE, {
      progressCallback,
      ...MODEL_CONFIG
    });
    
    isModelLoaded = true;
    postMessage({ type: 'status', status: 'available' });
  } catch (error) {
    console.error('Failed to load model:', error);
    postMessage({ type: 'error', message: 'Failed to load AI model. Please try again.' });
  }
}

// Generate response
async function generateResponse(prompt, context) {
  if (!wllama || !isModelLoaded) {
    throw new Error('Model not loaded');
  }
  
  try {
    // Construct the full prompt with context
    const systemPrompt = "You are a helpful AI assistant for Luis Sanchez's portfolio. Answer questions about his work, projects, and experience based on the provided context. Be concise, professional, and helpful.";
    
    const fullPrompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>

${systemPrompt}<|eot_id|><|start_header_id|>user<|end_header_id|>

Here is the content of the current section:

${context}

Based on this context, please answer the following question: ${prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>

`;

    const response = await wllama.createCompletion(fullPrompt, {
      nPredict: 512,
      sampling: {
        temp: 0.7,
        top_k: 40,
        top_p: 0.9,
      },
      repeatPenalty: 1.1,
      seed: -1,
      stopSequence: ['<|eot_id|>']
    });
    
    return response.trim();
  } catch (error) {
    console.error('Failed to generate response:', error);
    throw error;
  }
}

// Message handler
self.onmessage = async function(e) {
  const { type, data } = e.data;
  
  try {
    switch (type) {
      case 'init':
        const initialized = await initializeWllama();
        if (!initialized) {
          postMessage({ type: 'error', message: 'Failed to initialize AI assistant' });
          return;
        }
        
        // Always start with ready_to_download since wllama.loadModelFromHF handles caching internally
        postMessage({ type: 'status', status: 'ready_to_download' });
        break;
        
      case 'download':
        await loadModel();
        break;
        
      case 'prompt':
        const { prompt, context } = data;
        postMessage({ type: 'thinking' });
        
        try {
          const response = await generateResponse(prompt, context);
          postMessage({ type: 'response', response });
        } catch (error) {
          postMessage({ type: 'error', message: 'Failed to generate response. Please try again.' });
        }
        break;
        
      default:
        console.warn('Unknown message type:', type);
    }
  } catch (error) {
    console.error('Worker error:', error);
    postMessage({ type: 'error', message: error.message });
  }
};