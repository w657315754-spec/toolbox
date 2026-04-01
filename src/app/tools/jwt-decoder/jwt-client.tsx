"use client";

import { useState, useMemo } from "react";

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  return decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
}

const SAMPLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtClient() {
  const [token, setToken] = useState(SAMPLE);

  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split(".");
    if (parts.length !== 3) return { error: "Invalid JWT: expected 3 parts separated by dots." };
    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      return { header, payload, signature: parts[2] };
    } catch (e) {
      return { error: "Failed to decode JWT: " + (e as Error).message };
    }
  }, [token]);

  const formatExp = (payload: Record<string, unknown>) => {
    if (typeof payload.exp === "number") {
      const d = new Date(payload.exp * 1000);
      const now = Date.now();
      const expired = payload.exp * 1000 < now;
      return (
        <div className={`text-sm mt-2 px-3 py-2 rounded ${expired ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {expired ? "⚠ Expired" : "✓ Valid"}: {d.toLocaleString()}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste your JWT token here..."
        spellCheck={false}
        className="w-full h-32 p-4 font-mono text-sm rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white break-all"
      />

      {decoded && "error" in decoded && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {decoded.error}
        </div>
      )}

      {decoded && "header" in decoded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Header</h3>
            <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Payload</h3>
            <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
            {formatExp(decoded.payload as Record<string, unknown>)}
          </div>
          <div className="lg:col-span-2 rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Signature</h3>
            <p className="font-mono text-sm text-gray-800 break-all">{decoded.signature}</p>
            <p className="text-xs text-gray-400 mt-1">Note: Signature verification requires the secret key and is not performed client-side.</p>
          </div>
        </div>
      )}
    </div>
  );
}
