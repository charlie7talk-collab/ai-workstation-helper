const tools = [
  "Claude Desktop",
  "Claude Code",
  "Codex",
  "CC Switch",
  "CLIProxyAPI",
  "Windsurf",
  "Kiro",
  "Hermes",
  "Antigravity",
];

const providers = [
  "阿里百炼 / DashScope",
  "DeepSeek",
  "OpenRouter",
  "OpenAI Compatible",
  "Anthropic Compatible",
  "Gemini Compatible",
  "本地模型 / Ollama",
];

const features = [
  {
    title: "Base URL 检查",
    description: "区分 OpenAI、Anthropic、Gemini、百炼 Coding Plan 等不同接口地址，避免填错。",
  },
  {
    title: "API 格式推荐",
    description: "根据供应商和工具自动判断应该使用 OpenAI Chat Completions、Responses 还是 Anthropic Messages。",
  },
  {
    title: "模型映射生成",
    description: "为 Claude Desktop / CC Switch 生成 Sonnet、Opus、Haiku 三类模型映射建议。",
  },
  {
    title: "报错解释",
    description: "把 400、401、model not found、upstream error 等报错翻译成可执行排查步骤。",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">
            AI Workstation Helper
          </div>
          <a
            href="https://github.com/charlie7talk-collab/ai-workstation-helper"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-400 hover:text-white"
          >
            GitHub
          </a>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              面向独立开发者的 AI API 工作站配置助手
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
              5 分钟配置你的
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                AI 编程工作站
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              自动整理 Claude、Codex、CC Switch、CLIProxyAPI、阿里百炼、
              DeepSeek、OpenRouter 等工具的 Base URL、API 格式、模型映射和常见报错。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#generator"
                className="rounded-full bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                开始生成配置
              </a>
              <a
                href="#features"
                className="rounded-full border border-slate-700 px-6 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-slate-400"
              >
                查看支持范围
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
            <div className="mb-4 text-sm text-slate-400">当前阶段</div>
            <div className="space-y-4">
              {[
                "Cloudflare Pages 部署完成",
                "GitHub 自动部署链路完成",
                "UptimeRobot 监控完成",
                "下一步：配置生成器页面",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
          <h2 className="text-3xl font-bold">第一版功能</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            先解决最真实、最容易踩坑的问题：接口地址、API 格式、模型名称和报错排查。
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6"
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="generator" className="border-t border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div>
            <h2 className="text-3xl font-bold">支持的工具</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold">支持的供应商</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {providers.map((provider) => (
                <span
                  key={provider}
                  className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
                >
                  {provider}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8">
            <h2 className="text-2xl font-bold">下一步要做什么？</h2>
            <p className="mt-4 leading-8 text-slate-300">
              接下来会加入真正的配置生成器：选择工具、供应商和 API 格式后，自动输出
              Base URL、模型映射、测试命令和排错清单。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
