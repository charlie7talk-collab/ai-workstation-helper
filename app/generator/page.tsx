"use client";

import { useMemo, useState } from "react";
import {
  generateAdvice,
  providers,
  ProviderKey,
  tools,
  ToolKey,
} from "@/lib/presets";

const toolOptions = Object.entries(tools) as [ToolKey, (typeof tools)[ToolKey]][];
const providerOptions = Object.entries(providers) as [
  ProviderKey,
  (typeof providers)[ProviderKey],
][];

export default function GeneratorPage() {
  const [toolKey, setToolKey] = useState<ToolKey>("cc-switch");
  const [providerKey, setProviderKey] =
    useState<ProviderKey>("dashscope-openai");

  const result = useMemo(
    () => generateAdvice(toolKey, providerKey),
    [toolKey, providerKey],
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between">
          <a href="/" className="text-lg font-semibold tracking-tight">
            AI Workstation Helper
          </a>
          <a
            href="/"
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-400 hover:text-white"
          >
            返回首页
          </a>
        </nav>

        <div className="py-14">
          <div className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            配置生成器 v0.1
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            生成你的 AI 工具接入配置
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            选择工具和模型供应商，自动生成 Base URL、API 格式、模型映射、测试命令和排错提醒。
            第一版先使用固定规则库，不上传你的 API Key。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold">选择配置</h2>

            <label className="mt-6 block">
              <span className="text-sm text-slate-400">目标工具</span>
              <select
                value={toolKey}
                onChange={(event) => setToolKey(event.target.value as ToolKey)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
              >
                {toolOptions.map(([key, tool]) => (
                  <option key={key} value={key}>
                    {tool.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-3 rounded-2xl bg-slate-950/70 p-4 text-sm leading-6 text-slate-400">
              {tools[toolKey].description}
            </div>

            <label className="mt-6 block">
              <span className="text-sm text-slate-400">模型供应商</span>
              <select
                value={providerKey}
                onChange={(event) =>
                  setProviderKey(event.target.value as ProviderKey)
                }
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
              >
                {providerOptions.map(([key, provider]) => (
                  <option key={key} value={key}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-3 rounded-2xl bg-slate-950/70 p-4 text-sm leading-6 text-slate-400">
              {providers[providerKey].keyHint}
            </div>
          </section>

          <section className="space-y-5">
            <ResultCard title="Base URL">
              <CodeBlock value={result.provider.baseUrl} />
            </ResultCard>

            <ResultCard title="API 格式">
              <CodeBlock value={result.provider.apiFormat} />
            </ResultCard>

            <ResultCard title="模型映射建议">
              <div className="grid gap-3 sm:grid-cols-3">
                <ModelItem label="Sonnet" value={result.provider.modelMap.sonnet} />
                <ModelItem label="Opus" value={result.provider.modelMap.opus} />
                <ModelItem label="Haiku" value={result.provider.modelMap.haiku} />
              </div>
            </ResultCard>

            <ResultCard title="测试命令">
              <CodeBlock value={result.provider.testCommand} />
            </ResultCard>

            <ResultCard title="注意事项">
              <ul className="space-y-3 text-sm leading-6 text-slate-300">
                {[...result.provider.warnings, ...result.notes].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ResultCard>
          </section>
        </div>
      </section>
    </main>
  );
}

function ResultCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function CodeBlock({ value }: { value: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-cyan-100">
      <code>{value}</code>
    </pre>
  );
}

function ModelItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 break-words text-sm font-medium text-slate-100">
        {value}
      </div>
    </div>
  );
}
