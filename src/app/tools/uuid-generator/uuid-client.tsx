"use client";

import { useState, useCallback } from "react";

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function UuidClient() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const list = Array.from({ length: count }, () => generateUUID());
    setUuids(list);
  }, [count]);

  const handleCopy = async () => {
    const text = uuids.map((u) => (uppercase ? u.toUpperCase() : u)).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const display = uuids.map((u) => (uppercase ? u.toUpperCase() : u));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-gray-600">Count:</label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
          className="w-20 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded"
          />
          Uppercase
        </label>
        <button
          onClick={generate}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Generate
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        >
          {copied ? "✓ Copied" : "Copy All"}
        </button>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap break-all">
          {display.join("\n")}
        </pre>
      </div>
    </div>
  );
}
