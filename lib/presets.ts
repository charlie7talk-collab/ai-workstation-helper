export type ProviderKey =
  | "dashscope-openai"
  | "dashscope-coding-plan"
  | "deepseek"
  | "openrouter";

export type ToolKey =
  | "claude-desktop"
  | "cc-switch"
  | "codex"
  | "cliproxyapi";

export const tools: Record<
  ToolKey,
  {
    name: string;
    description: string;
  }
> = {
  "claude-desktop": {
    name: "Claude Desktop",
    description: "适合配置第三方 Gateway、Cowork、模型映射。",
  },
  "cc-switch": {
    name: "CC Switch",
    description: "适合统一管理 Claude、Codex、Hermes 等工具的模型供应商。",
  },
  codex: {
    name: "Codex",
    description: "适合接 OpenAI-compatible API 或本地模型网关。",
  },
  cliproxyapi: {
    name: "CLIProxyAPI",
    description: "适合把 CLI/OAuth 类工具转换成本地兼容 API。",
  },
};

export const providers: Record<
  ProviderKey,
  {
    name: string;
    keyHint: string;
    baseUrl: string;
    apiFormat: string;
    modelMap: {
      sonnet: string;
      opus: string;
      haiku: string;
    };
    warnings: string[];
    testCommand: string;
  }
> = {
  "dashscope-openai": {
    name: "阿里百炼 OpenAI 兼容接口",
    keyHint: "普通百炼 API Key，通常是 sk- 开头",
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    apiFormat: "OpenAI Chat Completions",
    modelMap: {
      sonnet: "qwen-plus",
      opus: "qwen-max",
      haiku: "qwen-turbo",
    },
    warnings: [
      "API 格式不要选择 Anthropic Messages。",
      "Base URL 不要填写百炼控制台地址。",
      "Claude Desktop 需要通过 CC Switch 或其他网关做协议转换。",
      "API Key 不要放在前端页面或公开仓库里。",
    ],
    testCommand:
      'curl https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions -H "Authorization: Bearer $DASHSCOPE_API_KEY" -H "Content-Type: application/json" -d "{\\"model\\":\\"qwen-plus\\",\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"hi\\"}]}"',
  },

  "dashscope-coding-plan": {
    name: "阿里百炼 Coding Plan / Anthropic 兼容",
    keyHint: "Coding Plan 专属 Key，通常是 sk-sp- 开头",
    baseUrl: "https://coding.dashscope.aliyuncs.com/apps/anthropic",
    apiFormat: "Anthropic Messages",
    modelMap: {
      sonnet: "qwen3.6-plus",
      opus: "qwen3.6-plus",
      haiku: "qwen3.6-plus",
    },
    warnings: [
      "不要在 Base URL 后面加 /v1。",
      "不要和普通百炼 sk- Key 混用。",
      "如果模型报 not found，先把 Sonnet / Opus / Haiku 都映射到同一个可用模型。",
      "Claude Desktop 只识别 claude-sonnet-*、claude-opus-*、claude-haiku-* 三类显示模型，实际模型要在网关里映射。",
    ],
    testCommand:
      'curl https://coding.dashscope.aliyuncs.com/apps/anthropic/v1/messages -H "Authorization: Bearer $DASHSCOPE_API_KEY" -H "anthropic-version: 2023-06-01" -H "Content-Type: application/json" -d "{\\"model\\":\\"qwen3.6-plus\\",\\"max_tokens\\":64,\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"hi\\"}]}"',
  },

  deepseek: {
    name: "DeepSeek API",
    keyHint: "DeepSeek API Key",
    baseUrl: "https://api.deepseek.com",
    apiFormat: "OpenAI Chat Completions",
    modelMap: {
      sonnet: "deepseek-chat",
      opus: "deepseek-reasoner",
      haiku: "deepseek-chat",
    },
    warnings: [
      "DeepSeek 是 OpenAI-compatible 风格，不是 Anthropic Messages。",
      "如果接 Claude Desktop，建议通过 CC Switch / LiteLLM / New API 做协议转换。",
      "不要把 DeepSeek API Key 写进客户端代码。",
    ],
    testCommand:
      'curl https://api.deepseek.com/chat/completions -H "Authorization: Bearer $DEEPSEEK_API_KEY" -H "Content-Type: application/json" -d "{\\"model\\":\\"deepseek-chat\\",\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"hi\\"}]}"',
  },

  openrouter: {
    name: "OpenRouter",
    keyHint: "OpenRouter API Key",
    baseUrl: "https://openrouter.ai/api/v1",
    apiFormat: "OpenAI Chat Completions",
    modelMap: {
      sonnet: "anthropic/claude-sonnet-4.5",
      opus: "anthropic/claude-opus-4.1",
      haiku: "anthropic/claude-3.5-haiku",
    },
    warnings: [
      "OpenRouter 模型名通常带供应商前缀，例如 anthropic/、openai/、google/。",
      "如果模型不可用，先去 OpenRouter 控制台确认账号权限和余额。",
      "建议在网关层统一模型别名，不要让每个客户端直接依赖 OpenRouter 模型名。",
    ],
    testCommand:
      'curl https://openrouter.ai/api/v1/chat/completions -H "Authorization: Bearer $OPENROUTER_API_KEY" -H "Content-Type: application/json" -d "{\\"model\\":\\"openai/gpt-4o-mini\\",\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"hi\\"}]}"',
  },
};

export function generateAdvice(toolKey: ToolKey, providerKey: ProviderKey) {
  const tool = tools[toolKey];
  const provider = providers[providerKey];

  const notes: string[] = [];

  if (toolKey === "claude-desktop") {
    notes.push("Claude Desktop 自身更适合接 Anthropic Messages 或通过 Gateway 转换后的接口。");
    notes.push("如果供应商是 OpenAI-compatible，建议先接入 CC Switch、LiteLLM 或 New API 再给 Claude Desktop 使用。");
  }

  if (toolKey === "cc-switch") {
    notes.push("CC Switch 里建议开启模型映射，把 Claude 显示模型映射到供应商真实模型。");
    notes.push("Claude Desktop 的 Sonnet / Opus / Haiku 三类角色都要保证有可用模型。");
  }

  if (toolKey === "codex") {
    notes.push("Codex 更适合 OpenAI-compatible endpoint。Anthropic 接口通常需要额外网关转换。");
  }

  if (toolKey === "cliproxyapi") {
    notes.push("CLIProxyAPI 建议只绑定本机 127.0.0.1，不建议暴露公网。");
    notes.push("订阅型 OAuth 代理不要作为生产 API 服务转售或共享。");
  }

  return {
    tool,
    provider,
    notes,
  };
}
