"use client";

import { useState, useMemo } from "react";

interface DiffLine {
  type: "equal" | "add" | "remove";
  text: string;
  lineA?: number;
  lineB?: number;
}

function computeDiff(a: string, b: string): DiffLine[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const m = linesA.length;
  const n = linesB.length;

  // Simple LCS-based diff
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = linesA[i - 1] === linesB[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = m, j = n;
  const stack: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      stack.push({ type: "equal", text: linesA[i - 1], lineA: i, lineB: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: "add", text: linesB[j - 1], lineB: j });
      j--;
    } else {
      stack.push({ type: "remove", text: linesA[i - 1], lineA: i });
      i--;
    }
  }
  while (stack.length) result.push(stack.pop()!);
  return result;
}

const SAMPLE_A = `function greet(name) {
  console.log("Hello, " + name);
  return true;
}`;

const SAMPLE_B = `function greet(name, greeting) {
  console.log(greeting + ", " + name);
  return true;
}`;

export default function DiffClient() {
  const [textA, setTextA] = useState(SAMPLE_A);
  const [textB, setTextB] = useState(SAMPLE_B);

  const diff = useMemo(() => computeDiff(textA, textB), [textA, textB]);

  const stats = useMemo(() => {
    let added = 0, removed = 0;
    for (const d of diff) {
      if (d.type === "add") added++;
      if (d.type === "remove") removed++;
    }
    return { added, removed };
  }, [diff]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Original</label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="Paste original text..."
            spellCheck={false}
            className="w-full h-52 p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Modified</label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder="Paste modified text..."
            spellCheck={false}
            className="w-full h-52 p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      <div className="flex gap-4 text-sm">
        <span className="text-green-700">+{stats.added} added</span>
        <span className="text-red-700">-{stats.removed} removed</span>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-auto max-h-[500px]">
          <table className="w-full text-sm font-mono">
            <tbody>
              {diff.map((line, i) => (
                <tr
                  key={i}
                  className={
                    line.type === "add"
                      ? "bg-green-50"
                      : line.type === "remove"
                      ? "bg-red-50"
                      : ""
                  }
                >
                  <td className="w-12 text-right pr-2 text-gray-400 select-none border-r border-gray-200 px-2 py-0.5">
                    {line.lineA ?? ""}
                  </td>
                  <td className="w-12 text-right pr-2 text-gray-400 select-none border-r border-gray-200 px-2 py-0.5">
                    {line.lineB ?? ""}
                  </td>
                  <td className="w-6 text-center select-none px-1 py-0.5">
                    <span className={line.type === "add" ? "text-green-600" : line.type === "remove" ? "text-red-600" : "text-gray-300"}>
                      {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
                    </span>
                  </td>
                  <td className="px-3 py-0.5 whitespace-pre-wrap break-all">
                    {line.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
