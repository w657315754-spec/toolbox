"use client";

import { useState, useCallback } from "react";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0")).join("")
  );
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

interface ColorState {
  r: number; g: number; b: number;
  h: number; s: number; l: number;
  hex: string;
}

function fromRgb(r: number, g: number, b: number): ColorState {
  const [h, s, l] = rgbToHsl(r, g, b);
  return { r, g, b, h, s, l, hex: rgbToHex(r, g, b) };
}

const DEFAULT_COLOR = fromRgb(37, 99, 235); // blue-600

export default function ColorConverterTool() {
  const [color, setColor] = useState<ColorState>(DEFAULT_COLOR);
  const [hexInput, setHexInput] = useState(DEFAULT_COLOR.hex);
  const [rgbInput, setRgbInput] = useState(`${DEFAULT_COLOR.r}, ${DEFAULT_COLOR.g}, ${DEFAULT_COLOR.b}`);
  const [hslInput, setHslInput] = useState(`${DEFAULT_COLOR.h}, ${DEFAULT_COLOR.s}%, ${DEFAULT_COLOR.l}%`);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const updateAll = useCallback((c: ColorState) => {
    setColor(c);
    setHexInput(c.hex);
    setRgbInput(`${c.r}, ${c.g}, ${c.b}`);
    setHslInput(`${c.h}, ${c.s}%, ${c.l}%`);
    setError("");
  }, []);

  const handleHexChange = (value: string) => {
    setHexInput(value);
    const clean = value.trim();
    const rgb = hexToRgb(clean.startsWith("#") ? clean : `#${clean}`);
    if (rgb) {
      const c = fromRgb(...rgb);
      setColor(c);
      setRgbInput(`${c.r}, ${c.g}, ${c.b}`);
      setHslInput(`${c.h}, ${c.s}%, ${c.l}%`);
      setError("");
    } else if (clean.replace("#", "").length >= 6) {
      setError("无效的 HEX 颜色值");
    }
  };

  const handleRgbChange = (value: string) => {
    setRgbInput(value);
    const parts = value.split(/[,\s]+/).filter(Boolean).map(Number);
    if (parts.length === 3 && parts.every((n) => !isNaN(n) && n >= 0 && n <= 255)) {
      const c = fromRgb(parts[0], parts[1], parts[2]);
      setColor(c);
      setHexInput(c.hex);
      setHslInput(`${c.h}, ${c.s}%, ${c.l}%`);
      setError("");
    }
  };

  const handleHslChange = (value: string) => {
    setHslInput(value);
    const parts = value.replace(/%/g, "").split(/[,\s]+/).filter(Boolean).map(Number);
    if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
      const [h, s, l] = parts;
      if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
        const [r, g, b] = hslToRgb(h, s, l);
        const c: ColorState = { r, g, b, h, s, l, hex: rgbToHex(r, g, b) };
        setColor(c);
        setHexInput(c.hex);
        setRgbInput(`${r}, ${g}, ${b}`);
        setError("");
      }
    }
  };

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rgb = hexToRgb(e.target.value);
    if (rgb) updateAll(fromRgb(...rgb));
  };

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

  return (
    <div className="space-y-6">
      {/* 颜色预览 */}
      <div className="flex items-center gap-6">
        <div
          className="w-32 h-32 rounded-xl border border-gray-300 shadow-inner shrink-0"
          style={{ backgroundColor: color.hex }}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500">颜色选择器</label>
          <input
            type="color"
            value={color.hex}
            onChange={handleColorPicker}
            className="w-16 h-10 cursor-pointer border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <span className="font-medium">错误：</span>{error}
        </div>
      )}

      {/* 输入区域 */}
      <div className="space-y-4">
        {/* HEX */}
        <div className="flex items-center gap-3">
          <label className="w-12 text-sm font-medium text-gray-600 shrink-0">HEX</label>
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#2563eb"
            className="flex-1 px-3 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleCopy(color.hex, "hex")}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors shrink-0"
          >
            {copied === "hex" ? "✓" : "复制"}
          </button>
        </div>

        {/* RGB */}
        <div className="flex items-center gap-3">
          <label className="w-12 text-sm font-medium text-gray-600 shrink-0">RGB</label>
          <input
            type="text"
            value={rgbInput}
            onChange={(e) => handleRgbChange(e.target.value)}
            placeholder="37, 99, 235"
            className="flex-1 px-3 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleCopy(`rgb(${color.r}, ${color.g}, ${color.b})`, "rgb")}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors shrink-0"
          >
            {copied === "rgb" ? "✓" : "复制"}
          </button>
        </div>

        {/* HSL */}
        <div className="flex items-center gap-3">
          <label className="w-12 text-sm font-medium text-gray-600 shrink-0">HSL</label>
          <input
            type="text"
            value={hslInput}
            onChange={(e) => handleHslChange(e.target.value)}
            placeholder="217, 91%, 60%"
            className="flex-1 px-3 py-2 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleCopy(`hsl(${color.h}, ${color.s}%, ${color.l}%)`, "hsl")}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors shrink-0"
          >
            {copied === "hsl" ? "✓" : "复制"}
          </button>
        </div>
      </div>

      {/* CSS 格式速查 */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-sm font-medium text-gray-600 mb-3">CSS 格式速查</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: "HEX", value: color.hex },
            { label: "RGB", value: `rgb(${color.r}, ${color.g}, ${color.b})` },
            { label: "HSL", value: `hsl(${color.h}, ${color.s}%, ${color.l}%)` },
            { label: "RGBA", value: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors"
              onClick={() => handleCopy(item.value, `css-${item.label}`)}
            >
              <code className="font-mono text-sm truncate">{item.value}</code>
              <span className="ml-2 text-xs text-blue-600 shrink-0">
                {copied === `css-${item.label}` ? "✓" : "复制"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
