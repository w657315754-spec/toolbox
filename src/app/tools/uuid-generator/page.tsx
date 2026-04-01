import type { Metadata } from "next";
import UuidClient from "./uuid-client";

export const metadata: Metadata = {
  title: "UUID Generator - Generate UUID v4 Online",
  description:
    "Generate random UUID v4 identifiers instantly. Supports bulk generation and uppercase formatting. Free online tool.",
};

export default function UuidGeneratorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">UUID Generator</h1>
        <p className="text-gray-500 text-sm">
          Generate random UUID v4 identifiers. Supports bulk generation up to 100 at a time.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <UuidClient />
        </div>
      </div>
    </div>
  );
}
