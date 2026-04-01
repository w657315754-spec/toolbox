(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,87605,e=>{"use strict";var l=e.i(43476),r=e.i(71645);let s=`# Hello Markdown

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

Enjoy writing!`;e.s(["default",0,function(){let[e,o]=(0,r.useState)(s),a=(0,r.useMemo)(()=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/```(\w*)\n([\s\S]*?)```/g,'<pre class="bg-gray-100 rounded p-3 overflow-x-auto text-sm my-2"><code>$2</code></pre>').replace(/`([^`]+)`/g,'<code class="bg-gray-100 px-1 rounded text-sm">$1</code>').replace(/^######\s+(.+)$/gm,'<h6 class="text-sm font-bold mt-4 mb-1">$1</h6>').replace(/^#####\s+(.+)$/gm,'<h5 class="text-sm font-bold mt-4 mb-1">$1</h5>').replace(/^####\s+(.+)$/gm,'<h4 class="text-base font-bold mt-4 mb-1">$1</h4>').replace(/^###\s+(.+)$/gm,'<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>').replace(/^##\s+(.+)$/gm,'<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>').replace(/^#\s+(.+)$/gm,'<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>').replace(/\*\*\*(.+?)\*\*\*/g,"<strong><em>$1</em></strong>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</a>').replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" class="max-w-full rounded my-2" />').replace(/^---$/gm,'<hr class="my-4 border-gray-300" />').replace(/^&gt;\s+(.+)$/gm,'<blockquote class="border-l-4 border-gray-300 pl-4 text-gray-600 my-2">$1</blockquote>').replace(/^[-*]\s+(.+)$/gm,'<li class="ml-4 list-disc">$1</li>').replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g,'<ul class="my-2">$1</ul>').replace(/^(?!<[a-z])((?!<).+)$/gm,'<p class="my-1">$1</p>'),[e]);return(0,l.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:[(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{className:"text-sm font-medium text-gray-600 mb-1",children:"Markdown"}),(0,l.jsx)("textarea",{value:e,onChange:e=>o(e.target.value),placeholder:"Type your Markdown here...",spellCheck:!1,className:"w-full h-[500px] p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"})]}),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{className:"text-sm font-medium text-gray-600 mb-1",children:"Preview"}),(0,l.jsx)("div",{className:"w-full h-[500px] p-4 text-sm rounded-lg border border-gray-300 bg-white overflow-auto prose prose-sm max-w-none",dangerouslySetInnerHTML:{__html:a}})]})]})}])}]);