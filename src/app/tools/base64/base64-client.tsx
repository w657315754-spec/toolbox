"use client";

import { useState, useCallback, useRef } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const encode = useCallback((text: string) => {
    try {
      const encoded = btoa(
        new TextEncoder()
          .encode(text)
          .reduce((acc, byte) => acc + String.fromCharCode(byte), "")
      );
      setOutput(encoded);
      setError("");
    } catch {
      setError("编码失败");
      setOutput("");
    }
  }, []);

  const decode = useCallback((text: string) => {
    try {
      const binaryStr = atob(text.trim());
      const bytes = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
      const decoded = new TextDecoder().decode(bytes);
      setOutput(decoded);
      setError("");
    } catch {
      setError("无效的 Base64 字符串");
      setOutput("");
    }
  }, []);

  const handleConvert = useCallback(
    (value: string, m: "encode" | "decode") => {
      if (!value.trim()) {
        setOutput("");
        setError("");
        return;
      }
      m === "encode" ? encode(value) : decode(value);
    },
    [encode, decode]
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    handleConvert(value, mode);
  };

  const handleModeSwitch = (m: "encode" | "decode") => {
    setMode(m);
    handleConvert(input, m);
  };

  const handleSwap = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setInput(output);
    setMode(newMode);
    handleConvert(output, newMode);
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

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    readFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFile(file);
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // data:xxx;base64,XXXX -> 取 base64 部分
      const base64 = result.split(",")[1] || "";
      setInput(base64);
      setMode("decode");
      setOutput(`[文件: ${file.name}, 大小: ${(file.size / 1024).toFixed(1)} KB]`);
      setError("");
    };
    reader.readAsDataURL(file);
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
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        >
          📁 选择文件
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <span className="font-medium">错误：</span>{error}
        </div>
      )}

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            {mode === "encode" ? "原始文本" : "Base64 字符串"}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={
              mode === "encode"
                ? "输入要编码的文本，或拖拽文件到此处..."
                : "输入 Base64 字符串..."
            }
            spellCheck={false}
            className={`w-full h-[500px] p-4 font-mono text-sm rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
              error ? "border-red-300 bg-red-50/30" : "border-gray-300"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            {mode === "encode" ? "Base64 结果" : "解码结果"}
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
