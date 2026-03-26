"use client";

import { useState, useCallback } from "react";

export default function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [encodeComponent, setEncodeComponent] = useState(true);

  const convert = useCallback(
    (value: string, m: "encode" | "decode", component: boolean) => {
      if (!value.trim()) {
        setOutput("");
        setError("");
        return;
      }
      try {
        if (m === "encode") {
          setOutput(component ? encodeURIComponent(value) : encodeURI(value));
        } else {
          setOutput(component ? decodeURIComponent(value) : decodeURI(value));
        }
        setError("");
      } catch {
        setError(m === "encode" ? "编码失败" : "无效的编码字符串");
        setOutput("");
      }
    },
    []
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    convert(value, mode, encodeComponent);
  };

  const handleModeSwitch = (m: "encode" | "decode") => {
    setMode(m);
    convert(input, m, encodeComponent);
  };

  const handleComponentToggle = (v: boolean) => {
    setEncodeComponent(v);
    convert(input, mode, v);
  };

  const handleSwap = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setInput(output);
    setMode(newMode);
    convert(output, newMode, encodeComponent);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = output;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleModeSwitch("encode")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === "encode"
              ? "bg-blue-600 text-white"
              : "border border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          编码
        </button>
        <button
          onClick={() => handleModeSwitch("decode")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === "decode"
              ? "bg-blue-600 text-white"
              : "border border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          解码
        </button>
        <button
          onClick={handleSwap}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        >
          ⇅ 交换
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

        <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
          <label htmlFor="component-select">模式:</label>
          <select
            id="component-select"
            value={encodeComponent ? "component" : "uri"}
            onChange={(e) =>
              handleComponentToggle(e.target.value === "component")
            }
            className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
          >
            <option value="component">encodeURIComponent</option>
            <option value="uri">encodeURI</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <span className="font-medium">错误：</span>{error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            {mode === "encode" ? "原始 URL / 文本" : "编码后的字符串"}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={
              mode === "encode"
                ? "输入要编码的 URL 或文本..."
                : "输入编码后的字符串..."
            }
            spellCheck={false}
            className={`w-full h-[500px] p-4 font-mono text-sm rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
              error ? "border-red-300 bg-red-50/30" : "border-gray-300"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            {mode === "encode" ? "编码结果" : "解码结果"}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="转换结果将显示在这里..."
            spellCheck={false}
            className="w-full h-[500px] p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none bg-gray-50 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
