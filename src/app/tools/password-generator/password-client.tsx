"use client";

import { useState, useCallback } from "react";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generate(length: number, options: Record<string, boolean>): string {
  let chars = "";
  if (options.uppercase) chars += CHARSETS.uppercase;
  if (options.lowercase) chars += CHARSETS.lowercase;
  if (options.numbers) chars += CHARSETS.numbers;
  if (options.symbols) chars += CHARSETS.symbols;
  if (!chars) chars = CHARSETS.lowercase + CHARSETS.numbers;
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => chars[v % chars.length]).join("");
}

export default function PasswordClient() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [count, setCount] = useState(5);
  const [passwords, setPasswords] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => generate(16, { uppercase: true, lowercase: true, numbers: true, symbols: true }))
  );
  const [copied, setCopied] = useState(-1);

  const regenerate = useCallback(() => {
    setPasswords(Array.from({ length: count }, () => generate(length, options)));
  }, [length, options, count]);

  const handleCopy = async (i: number) => {
    await navigator.clipboard.writeText(passwords[i]);
    setCopied(i);
    setTimeout(() => setCopied(-1), 2000);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(passwords.join("\n"));
    setCopied(-2);
    setTimeout(() => setCopied(-1), 2000);
  };

  const toggleOption = (key: string) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Length:</label>
          <input
            type="number"
            min={4}
            max={128}
            value={length}
            onChange={(e) => setLength(Math.max(4, Math.min(128, Number(e.target.value))))}
            className="w-20 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Count:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
            className="w-20 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {Object.keys(CHARSETS).map((key) => (
          <label key={key} className="flex items-center gap-1.5 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={options[key as keyof typeof options]}
              onChange={() => toggleOption(key)}
              className="rounded"
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={regenerate} className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          Generate
        </button>
        <button onClick={handleCopyAll} className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
          {copied === -2 ? "✓ Copied All" : "Copy All"}
        </button>
      </div>
      <div className="space-y-2">
        {passwords.map((pw, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
            <code className="flex-1 font-mono text-sm text-gray-800 break-all">{pw}</code>
            <button
              onClick={() => handleCopy(i)}
              className="shrink-0 text-xs px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {copied === i ? "✓" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
