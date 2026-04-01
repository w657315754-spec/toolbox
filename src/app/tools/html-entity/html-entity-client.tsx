"use client";

import { useState, useCallback } from "react";

function encodeHtmlEntities(str: string): string {
  return str.replace(/[&<>"'\/]/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
    };
    return entities[char] || char;
  });
}

function decodeHtmlEntities(str: string): string {
  const textarea = typeof document !== "undefined" ? document.createElement("textarea") : null;
  if (!textarea) return str;
  textarea.innerHTML = str;
  return textarea.value;
}

export default function HtmlEntityClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const convert = useCallback((text: string, m: "encode" | "decode") => {
    if (!text) { setOutput(""); return; }
    setOutput(m === "encode" ? encodeHtmlEntities(text) : decodeHtmlEntities(text));
  }, []);

  const handleInputChange = (value: string) => {
    setInput(value);
    convert(value, mode);
  };

  const handleModeSwitch = (m: "encode" | "decode") => {
    setMode(m);
    convert(input, m);
  };

  const handleSwap = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setInput(output);
    setMode(newMode);
    convert(output, newMode);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleModeSwitch("encode")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${mode === "encode" ? "bg-blue-600 text-white" : "border border-gray-300 bg-white hover:bg-gray-50"}`}
        >
          Encode
        </button>
        <button
          onClick={() => handleModeSwitch("decode")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${mode === "decode" ? "bg-blue-600 text-white" : "border border-gray-300 bg-white hover:bg-gray-50"}`}
        >
          Decode
        </button>
        <button onClick={handleSwap} className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
          ⇅ Swap
        </button>
        <button onClick={handleCopy} disabled={!output} className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors disabled:opacity-40">
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">{mode === "encode" ? "Raw HTML" : "HTML Entities"}</label>
          <textarea value={input} onChange={(e) => handleInputChange(e.target.value)} placeholder={mode === "encode" ? 'e.g. <div class="test">' : "e.g. &lt;div&gt;"} spellCheck={false} className="w-full h-[300px] p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">{mode === "encode" ? "Encoded Entities" : "Decoded HTML"}</label>
          <textarea value={output} readOnly placeholder="Result..." spellCheck={false} className="w-full h-[300px] p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none bg-gray-50 focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
