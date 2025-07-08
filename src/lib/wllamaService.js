import { Wllama, ModelManager } from '@wllama/wllama';
import singleThreadWasm from '@wllama/wllama/esm/single-thread/wllama.wasm?url';
import multiThreadWasm from '@wllama/wllama/esm/multi-thread/wllama.wasm?url';

let wllama = null;
let modelManager = null;
let isModelLoaded = false;

// Model configuration
const HF_REPO = 'bartowski/google_gemma-3-1b-it-GGUF';
const MODEL_FILE = 'google_gemma-3-1b-it-Q4_K_M.gguf';
const MODEL_URL = `https://huggingface.co/${HF_REPO}/resolve/main/${MODEL_FILE}`;

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

// --- Private helper to ensure wllama is initialized ---
async function _ensureWllamaInitialized() {
  if (wllama) return; // Already initialized, do nothing

  console.log("Creating a new wllama instance...");
  const pathConfig = {
    'single-thread/wllama.wasm': singleThreadWasm,
    'multi-thread/wllama.wasm': multiThreadWasm,
  };
  wllama = new Wllama(pathConfig);
  modelManager = new ModelManager();
}

// Initialize wllama and check for cached models
export async function initWllama(statusCallback) {
  try {
    await _ensureWllamaInitialized();
    
    const models = await modelManager.getModels();
    const cachedModel = models.find(m => m.url === MODEL_URL);

    if (cachedModel) {
      statusCallback('loading_model');
      await wllama.loadModel(cachedModel, MODEL_CONFIG);
      isModelLoaded = true;
      statusCallback('available');
    } else {
      statusCallback('ready_to_download');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize wllama:', error);
    statusCallback('unavailable');
    return false;
  }
}

// Download and load model from Hugging Face
export async function downloadModel(progressCallback, statusCallback) {
  try {
    // Ensure we have a fresh wllama instance if it was purged
    await _ensureWllamaInitialized();

    statusCallback('downloading'); // Changed from loading_model to downloading
    
    const onProgress = ({ loaded, total }) => {
      const progress = Math.round((loaded / total) * 100);
      progressCallback(progress);
    };

    const model = await modelManager.downloadModel(MODEL_URL, {
      progressCallback: onProgress,
    });
    
    statusCallback('loading_model'); // Now show loading status
    await wllama.loadModel(model, MODEL_CONFIG);
    
    isModelLoaded = true;
    statusCallback('available');
  } catch (error) {
    console.error('Failed to load model:', error);
    statusCallback('unavailable');
    throw new Error('Failed to load AI model. Please try again.');
  }
}

// Purge model from cache AND terminate the wllama instance
export async function purgeModel() {
  if (!modelManager) return;
  
  try {
    const models = await modelManager.getModels();
    for (const model of models) {
      await model.remove();
    }
    isModelLoaded = false;
    
    // --- THIS IS THE KEY FIX ---
    // If a wllama instance exists, terminate it.
    if (wllama) {
      await wllama.exit();
      wllama = null; // Set to null so it can be re-initialized later
      console.log('AI model cache purged and wllama instance terminated.');
    } else {
      console.log('AI model cache purged.');
    }

  } catch (error) {
    console.error('Failed to purge model cache:', error);
    throw new Error('Failed to purge model cache. Please try again.');
  }
}

// Generate response using the loaded model
export async function promptWllama(prompt, context, thinkingCallback, responseCallback, errorCallback) {
  if (!wllama || !isModelLoaded) {
    errorCallback('Model not loaded');
    return;
  }
  
  try {
    thinkingCallback();
    
    const systemPrompt = "You are a helpful AI assistant for Luis Sanchez's portfolio. Answer questions about his work, projects, and experience based on the provided context. Be concise, professional, and helpful.";
    const userMessage = `Here is the content of the current section:\n\n${context}\n\nBased on this context, please answer the following question: ${prompt}`;
    
    const fullPrompt = `<bos><start_of_turn>user\n${systemPrompt}\n\n${userMessage}<end_of_turn>\n<start_of_turn>model\n`;

    const response = await wllama.createCompletion(fullPrompt, {
      nPredict: 512,
      sampling: {
        temp: 0.7,
        top_k: 40,
        top_p: 0.9,
      },
      repeatPenalty: 1.1,
      seed: -1,
      stopSequence: ['<end_of_turn>']
    });
    
    responseCallback(response.trim());
  } catch (error) {
    console.error('Failed to generate response:', error);
    errorCallback('Failed to generate response. Please try again.');
  }
}
