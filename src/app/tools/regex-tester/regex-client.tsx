"use client";

import { useState, useMemo } from "react";

interface MatchResult {
  full: string;
  index: number;
  groups: string[];
}

export default function RegexClient() {
  const [pattern, setPattern] = useState("(\\w+)@(\\w+\\.\\w+)");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("Contact us at hello@example.com or support@test.org");
  const [error, setError] = useState("");

  const matches: MatchResult[] = useMemo(() => {
    if (!pattern) { setError(""); return []; }
    try {
      const re = new RegExp(pattern, flags);
      setError("");
      const results: MatchResult[] = [];
      if (flags.includes("g")) {
        let m: RegExpExecArray | null;
        while ((m = re.exec(testStr)) !== null) {
          results.push({ full: m[0], index: m.index, groups: m.slice(1) });
          if (!m[0]) break;
        }
      } else {
        const m = re.exec(testStr);
        if (m) results.push({ full: m[0], index: m.index, groups: m.slice(1) });
      }
      return results;
    } catch (e) {
      setError((e as Error).message);
      return [];
    }
  }, [pattern, flags, testStr]);

  const highlighted = useMemo(() => {
    if (!pattern || error || matches.length === 0) return null;
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const parts: { text: string; match: boolean }[] = [];
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(testStr)) !== null) {
        if (m.index > lastIndex) parts.push({ text: testStr.slice(lastIndex, m.index), match: false });
        parts.push({ text: m[0], match: true });
        lastIndex = m.index + m[0].length;
        if (!m[0]) break;
      }
      if (lastIndex < testStr.length) parts.push({ text: testStr.slice(lastIndex), match: false });
      return parts;
    } catch {
      return null;
    }
  }, [pattern, flags, testStr, error, matches]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-gray-600 mb-1 block">Pattern</label>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            spellCheck={false}
            className="w-full px-4 py-2 font-mono text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-24">
          <label className="text-sm font-medium text-gray-600 mb-1 block">Flags</label>
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="gi"
            className="w-full px-4 py-2 font-mono text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Test String</label>
        <textarea
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
          placeholder="Enter test string..."
          spellCheck={false}
          className="w-full h-40 p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {highlighted && (
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Highlighted Matches</label>
          <div className="p-4 font-mono text-sm rounded-lg border border-gray-200 bg-white whitespace-pre-wrap break-all">
            {highlighted.map((part, i) =>
              part.match ? (
                <mark key={i} className="bg-yellow-200 rounded px-0.5">{part.text}</mark>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            {matches.length} Match{matches.length > 1 ? "es" : ""}
          </label>
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 text-sm">
                <span className="font-semibold text-gray-600">#{i + 1}</span>{" "}
                <span className="font-mono text-blue-700">{m.full}</span>
                <span className="text-gray-400 ml-2">at index {m.index}</span>
                {m.groups.length > 0 && (
                  <div className="mt-1 text-gray-500">
                    Groups: {m.groups.map((g, j) => (
                      <span key={j} className="font-mono text-green-700 mr-2">${j + 1}={g}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
