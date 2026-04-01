"use client";

import { useState, useMemo } from "react";

function parseMarkdown(md: string): string {
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-100 rounded p-3 overflow-x-auto text-sm my-2"><code>$2</code></pre>');
  // inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');
  // headings
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-sm font-bold mt-4 mb-1">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-sm font-bold mt-4 mb-1">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-base font-bold mt-4 mb-1">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>');
  // bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</a>');
  // images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded my-2" />');
  // hr
  html = html.replace(/^---$/gm, '<hr class="my-4 border-gray-300" />');
  // blockquote
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 text-gray-600 my-2">$1</blockquote>');
  // unordered list
  html = html.replace(/^[-*]\s+(.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul class="my-2">$1</ul>');
  // paragraphs
  html = html.replace(/^(?!<[a-z])((?!<).+)$/gm, '<p class="my-1">$1</p>');

  return html;
}

const SAMPLE = `# Hello Markdown

This is a **live preview** of your *Markdown* content.

## Features

- Bold, italic, and ***bold italic***
- [Links](https://example.com)
- Code: \`inline code\`

\`\`\`js
console.log("Hello, world!");
\`\`\`

> Blockquotes work too!

---

Enjoy writing!`;

export default function MarkdownClient() {
  const [input, setInput] = useState(SAMPLE);
  const html = useMemo(() => parseMarkdown(input), [input]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Markdown</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your Markdown here..."
          spellCheck={false}
          className="w-full h-[500px] p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Preview</label>
        <div
          className="w-full h-[500px] p-4 text-sm rounded-lg border border-gray-300 bg-white overflow-auto prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
