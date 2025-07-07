import { Wllama } from '@wllama/wllama';

let wllama = null;
let isModelLoaded = false;

// Model configuration
const MODEL_URL = 'https://huggingface.co/bartowski/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/Meta-Llama-3-8B-Instruct-Q4_K_M.gguf';
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
      wllama = new Wllama({
        // Use CDN for wllama assets
        pathConfig: {
          'single-thread/wllama.js': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/single-thread/wllama.js',
          'single-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/single-thread/wllama.wasm',
          'multi-thread/wllama.js': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/multi-thread/wllama.js',
          'multi-thread/wllama.wasm': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/multi-thread/wllama.wasm',
          'multi-thread/wllama.worker.mjs': 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/multi-thread/wllama.worker.mjs',
        }
      });
    }
    return true;
  } catch (error) {
    console.error('Failed to initialize wllama:', error);
    return false;
  }
}

// Check if model is cached
async function checkModelCache() {
  try {
    const cache = await caches.open('wllama-models');
    const response = await cache.match(MODEL_URL);
    return !!response;
  } catch (error) {
    console.error('Failed to check model cache:', error);
    return false;
  }
}

// Download and cache model
async function downloadModel() {
  try {
    postMessage({ type: 'status', status: 'downloading', progress: 0 });
    
    const cache = await caches.open('wllama-models');
    
    // Check if already cached
    const cachedResponse = await cache.match(MODEL_URL);
    if (cachedResponse) {
      postMessage({ type: 'status', status: 'loading_from_cache' });
      return cachedResponse;
    }
    
    // Download with progress tracking
    const response = await fetch(MODEL_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentLength = parseInt(response.headers.get('content-length') || '0');
    const reader = response.body.getReader();
    const chunks = [];
    let receivedLength = 0;
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      chunks.push(value);
      receivedLength += value.length;
      
      if (contentLength > 0) {
        const progress = Math.round((receivedLength / contentLength) * 100);
        postMessage({ type: 'status', status: 'downloading', progress });
      }
    }
    
    // Create response from chunks
    const blob = new Blob(chunks);
    const fullResponse = new Response(blob, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
    
    // Cache the response
    await cache.put(MODEL_URL, fullResponse.clone());
    
    return fullResponse;
  } catch (error) {
    console.error('Failed to download model:', error);
    throw error;
  }
}

// Load model into wllama
async function loadModel() {
  try {
    postMessage({ type: 'status', status: 'loading_model' });
    
    const modelResponse = await downloadModel();
    const modelArrayBuffer = await modelResponse.arrayBuffer();
    
    await wllama.loadModelFromBuffer(new Uint8Array(modelArrayBuffer), MODEL_CONFIG);
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
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
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
        
        const isCached = await checkModelCache();
        if (isCached) {
          postMessage({ type: 'status', status: 'cached_available' });
        } else {
          postMessage({ type: 'status', status: 'ready_to_download' });
        }
        break;
        
      case 'download':
        await loadModel();
        break;
        
      case 'load_cached':
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