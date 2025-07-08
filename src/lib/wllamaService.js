import { Wllama, ModelManager } from '@wllama/wllama';
import singleThreadWasm from '@wllama/wllama/esm/single-thread/wllama.wasm?url';
import multiThreadWasm from '@wllama/wllama/esm/multi-thread/wllama.wasm?url';

let wllama = null;
let modelManager = null;
let isModelLoaded = false;

// Model configuration
const HF_REPO = 'bartowski/Llama-3.2-1B-Instruct-GGUF';
const MODEL_FILE = 'Llama-3.2-1B-Instruct-Q4_K_M.gguf';
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

// Initialize wllama
export async function initWllama(statusCallback) {
  try {
    if (!wllama) {
      const pathConfig = {
        'single-thread/wllama.wasm': singleThreadWasm,
        'multi-thread/wllama.wasm': multiThreadWasm,
      };
      
      wllama = new Wllama(pathConfig);
      modelManager = new ModelManager();
    }
    
    // Check if model is already cached
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
    statusCallback('loading_model');
    
    // Progress callback for download tracking
    const onProgress = ({ loaded, total }) => {
      const progress = Math.round((loaded / total) * 100);
      console.log(`AI model download progress: ${progress}%`);
      progressCallback(progress);
      statusCallback('downloading', progress);
    };

    // Load model from Hugging Face with progress tracking
    const model = await modelManager.downloadModel(MODEL_URL, {
      progressCallback: onProgress,
    });
    
    await wllama.loadModel(model, MODEL_CONFIG);
    
    isModelLoaded = true;
    statusCallback('available');
  } catch (error) {
    console.error('Failed to load model:', error);
    statusCallback('unavailable');
    throw new Error('Failed to load AI model. Please try again.');
  }
}

// Purge model from cache
export async function purgeModel() {
  if (!modelManager) return;
  
  try {
    const models = await modelManager.getModels();
    for (const model of models) {
      await model.remove();
    }
    isModelLoaded = false;
    console.log('AI model cache purged.');
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
    // Show thinking status
    thinkingCallback();
    
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
    
    responseCallback(response.trim());
  } catch (error) {
    console.error('Failed to generate response:', error);
    errorCallback('Failed to generate response. Please try again.');
  }
}
