import { type AppConfig } from '@mlc-ai/web-llm'

const config: AppConfig = {
  model_list: [
    {
      model_url:
        'https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC/resolve/main/',
      local_id: 'TinyLlama-1.1B-Chat-v0.4-q4f32_1-1k',
      model_lib_url:
        'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q4f32_1-ctx1k-webgpu.wasm',
      vram_required_MB: 992.11,
      low_resource_required: true
    },
    {
      model_url: 'https://huggingface.co/mlc-ai/phi-1_5-q4f32_1-MLC/resolve/main/',
      local_id: 'Phi1.5-q4f32_1-1k',
      model_lib_url:
        'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/phi-1_5/phi-1_5-q4f32_1-ctx1k-webgpu.wasm',
      vram_required_MB: 1682.09,
      low_resource_required: true
    },
    {
      model_url:
        'https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC/resolve/main/',
      local_id: 'RedPajama-INCITE-Chat-3B-v1-q4f32_1',
      model_lib_url:
        'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f32_1-ctx2k-webgpu.wasm',
      vram_required_MB: 3928.09,
      low_resource_required: false
    },
    {
      model_url: 'https://huggingface.co/mlc-ai/phi-2-q4f32_1-MLC/resolve/main/',
      local_id: 'Phi2-q4f32_1',
      model_lib_url:
        'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/phi-2/phi-2-q4f32_1-ctx2k-webgpu.wasm',
      vram_required_MB: 4032.48,
      low_resource_required: false
    }
  ]
  // use_web_worker: false
}

export default config
