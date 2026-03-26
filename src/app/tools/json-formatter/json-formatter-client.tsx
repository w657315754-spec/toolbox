"use client";

import { useState, useCallback } from "react";

const SAMPLE_JSON = `{
  "name": "ToolBox",
  "version": "1.0.0",
  "tools": ["json-formatter"],
  "config": { "theme": "light", "lang": "zh-CN" }
}`;

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const formatJson = useCallback(
    (raw: string, space: number | null) => {
      if (!raw.trim()) {
        setOutput("");
        setError("");
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        setOutput(JSON.stringify(parsed, null, space ?? undefined));
        setError("");
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Invalid JSON";
        setError(msg);
        setOutput("");
      }
    },
    []
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    formatJson(value, indent);
  };

  const handleBeautify = () => {
    formatJson(input, indent);
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
    formatJson(SAMPLE_JSON, indent);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleBeautify}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          美化
        </button>
        <button
          onClick={handleMinify}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition-colors"
        >
          压缩
        </button>
        <button
          onClick={handleCopy}
          disabled={!output}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copied ? "✓ 已复制" : "复制结果"}
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        >
          清空
        </button>
        <button
          onClick={handleLoadSample}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        >
          示例
        </button>

        <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
          <label htmlFor="indent-select">缩进:</label>
          <select
            id="indent-select"
            value={indent}
            onChange={(e) => {
              const v = Number(e.target.value);
              setIndent(v);
              formatJson(input, v);
            }}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
          >
            <option value={2}>2 空格</option>
            <option value={4}>4 空格</option>
            <option value={1}>Tab</option>
          </select>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <span className="font-medium">JSON 语法错误：</span>
          {error}
        </div>
      )}

      {/* Editor panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            输入
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="在此粘贴 JSON..."
            spellCheck={false}
            className={`w-full h-[500px] p-4 font-mono text-sm rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
              error ? "border-red-300 bg-red-50/30" : "border-gray-300"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            输出
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="格式化结果将显示在这里..."
            spellCheck={false}
            className="w-full h-[500px] p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none bg-gray-50 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
