"use client";

import { useState, useCallback } from "react";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function generateSentence(minWords = 6, maxWords = 14): string {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words = Array.from({ length: len }, () => randomWord());
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentences = 5): string {
  return Array.from({ length: sentences }, () => generateSentence()).join(" ");
}

export default function LoremClient() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState(() =>
    Array.from({ length: 3 }, () => generateParagraph()).join("\n\n")
  );
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const text = Array.from({ length: paragraphs }, () => generateParagraph()).join("\n\n");
    setOutput(text);
  }, [paragraphs]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-gray-600">Paragraphs:</label>
        <input
          type="number"
          min={1}
          max={50}
          value={paragraphs}
          onChange={(e) => setParagraphs(Math.max(1, Math.min(50, Number(e.target.value))))}
          className="w-20 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <textarea
        value={output}
        readOnly
        className="w-full h-[500px] p-4 text-sm rounded-lg border border-gray-300 resize-none bg-gray-50 focus:outline-none"
      />
    </div>
  );
}
