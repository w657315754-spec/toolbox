"use client";

import { useState } from "react";

const BASES = [
  { label: "Binary (2)", base: 2, placeholder: "e.g. 1010" },
  { label: "Octal (8)", base: 8, placeholder: "e.g. 12" },
  { label: "Decimal (10)", base: 10, placeholder: "e.g. 10" },
  { label: "Hexadecimal (16)", base: 16, placeholder: "e.g. A" },
];

export default function NumberBaseClient() {
  const [values, setValues] = useState<Record<number, string>>({ 2: "", 8: "", 10: "", 16: "" });
  const [error, setError] = useState("");

  const handleChange = (base: number, value: string) => {
    if (!value.trim()) {
      setValues({ 2: "", 8: "", 10: "", 16: "" });
      setError("");
      return;
    }
    try {
      const num = parseInt(value, base);
      if (isNaN(num)) throw new Error("Invalid number");
      // Validate input characters
      const valid: Record<number, RegExp> = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^[0-9]+$/,
        16: /^[0-9a-fA-F]+$/,
      };
      if (!valid[base].test(value.trim())) throw new Error("Invalid character for base " + base);
      setError("");
      const newValues: Record<number, string> = {};
      for (const b of [2, 8, 10, 16]) {
        newValues[b] = b === base ? value : num.toString(b).toUpperCase();
      }
      // Keep lowercase for non-hex
      if (base !== 16) newValues[16] = num.toString(16).toUpperCase();
      setValues(newValues);
    } catch {
      setValues((prev) => ({ ...prev, [base]: value }));
      setError("Invalid input for base " + base);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BASES.map(({ label, base, placeholder }) => (
          <div key={base} className="rounded-lg border border-gray-200 bg-white p-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">{label}</label>
            <input
              value={values[base]}
              onChange={(e) => handleChange(base, e.target.value)}
              placeholder={placeholder}
              spellCheck={false}
              className="w-full px-4 py-2 font-mono text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
