"use client";

import { useState, useEffect, useCallback } from "react";

const DATE_FORMATS: { label: string; fn: (d: Date) => string }[] = [
  { label: "ISO 8601", fn: (d) => d.toISOString() },
  { label: "本地时间", fn: (d) => d.toLocaleString("zh-CN") },
  {
    label: "YYYY-MM-DD HH:mm:ss",
    fn: (d) => {
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    },
  },
  { label: "UTC 字符串", fn: (d) => d.toUTCString() },
  { label: "Unix 秒", fn: (d) => String(Math.floor(d.getTime() / 1000)) },
  { label: "Unix 毫秒", fn: (d) => String(d.getTime()) },
];

export default function TimestampTool() {
  const [tsInput, setTsInput] = useState("");
  const [unit, setUnit] = useState<"s" | "ms">("s");
  const [dateInput, setDateInput] = useState("");
  const [tsResult, setTsResult] = useState<Date | null>(null);
  const [dateResult, setDateResult] = useState<number | null>(null);
  const [tsError, setTsError] = useState("");
  const [dateError, setDateError] = useState("");
  const [now, setNow] = useState(Date.now());
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parseTimestamp = useCallback(
    (value: string, u: "s" | "ms") => {
      if (!value.trim()) {
        setTsResult(null);
        setTsError("");
        return;
      }
      const num = Number(value.trim());
      if (isNaN(num)) {
        setTsError("请输入有效的数字");
        setTsResult(null);
        return;
      }
      const ms = u === "s" ? num * 1000 : num;
      const d = new Date(ms);
      if (isNaN(d.getTime())) {
        setTsError("无效的时间戳");
        setTsResult(null);
        return;
      }
      setTsResult(d);
      setTsError("");
    },
    []
  );

  const parseDate = useCallback((value: string) => {
    if (!value.trim()) {
      setDateResult(null);
      setDateError("");
      return;
    }
    const d = new Date(value.trim());
    if (isNaN(d.getTime())) {
      setDateError("无法解析日期，请使用标准格式如 2024-01-01 12:00:00");
      setDateResult(null);
      return;
    }
    setDateResult(d.getTime());
    setDateError("");
  }, []);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const nowDate = new Date(now);

  return (
    <div className="space-y-6">
      {/* 当前时间 */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <h2 className="text-sm font-medium text-blue-700 mb-3">⏱ 当前时间（实时更新）</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DATE_FORMATS.map((fmt) => {
            const val = fmt.fn(nowDate);
            return (
              <div
                key={fmt.label}
                className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-blue-100"
              >
                <div className="min-w-0">
                  <div className="text-xs text-gray-400">{fmt.label}</div>
                  <div className="font-mono text-sm truncate">{val}</div>
                </div>
                <button
                  onClick={() => handleCopy(val, `now-${fmt.label}`)}
                  className="ml-2 shrink-0 text-xs text-blue-600 hover:text-blue-800"
                >
                  {copied === `now-${fmt.label}` ? "✓" : "复制"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 时间戳 → 日期 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-base font-semibold mb-4">时间戳 → 日期</h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tsInput}
              onChange={(e) => {
                setTsInput(e.target.value);
                parseTimestamp(e.target.value, unit);
              }}
              placeholder="输入时间戳，如 1700000000"
              className="flex-1 px-3 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={unit}
              onChange={(e) => {
                const u = e.target.value as "s" | "ms";
                setUnit(u);
                parseTimestamp(tsInput, u);
              }}
              className="border border-gray-300 rounded-lg px-2 py-2 text-sm bg-white"
            >
              <option value="s">秒</option>
              <option value="ms">毫秒</option>
            </select>
          </div>
          <button
            onClick={() => {
              const s = String(Math.floor(Date.now() / (unit === "s" ? 1000 : 1)));
              setTsInput(s);
              parseTimestamp(s, unit);
            }}
            className="mb-3 text-xs text-blue-600 hover:text-blue-800"
          >
            填入当前时间戳
          </button>
          {tsError && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 mb-3">
              {tsError}
            </div>
          )}
          {tsResult && (
            <div className="space-y-2">
              {DATE_FORMATS.slice(0, 4).map((fmt) => {
                const val = fmt.fn(tsResult);
                return (
                  <div
                    key={fmt.label}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400">{fmt.label}</div>
                      <div className="font-mono text-sm truncate">{val}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(val, `ts-${fmt.label}`)}
                      className="ml-2 shrink-0 text-xs text-blue-600 hover:text-blue-800"
                    >
                      {copied === `ts-${fmt.label}` ? "✓" : "复制"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 日期 → 时间戳 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-base font-semibold mb-4">日期 → 时间戳</h2>
          <input
            type="text"
            value={dateInput}
            onChange={(e) => {
              setDateInput(e.target.value);
              parseDate(e.target.value);
            }}
            placeholder="输入日期，如 2024-01-01 12:00:00"
            className="w-full px-3 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <button
            onClick={() => {
              const s = new Date().toISOString().slice(0, 19).replace("T", " ");
              setDateInput(s);
              parseDate(s);
            }}
            className="mb-3 text-xs text-blue-600 hover:text-blue-800"
          >
            填入当前时间
          </button>
          {dateError && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 mb-3">
              {dateError}
            </div>
          )}
          {dateResult !== null && (
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <div>
                  <div className="text-xs text-gray-400">Unix 秒</div>
                  <div className="font-mono text-sm">
                    {Math.floor(dateResult / 1000)}
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleCopy(String(Math.floor(dateResult / 1000)), "dt-s")
                  }
                  className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                >
                  {copied === "dt-s" ? "✓" : "复制"}
                </button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <div>
                  <div className="text-xs text-gray-400">Unix 毫秒</div>
                  <div className="font-mono text-sm">{dateResult}</div>
                </div>
                <button
                  onClick={() => handleCopy(String(dateResult), "dt-ms")}
                  className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                >
                  {copied === "dt-ms" ? "✓" : "复制"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
