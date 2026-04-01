import type { Metadata } from "next";
import HashClient from "./hash-client";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA1, SHA256, SHA512",
  description:
    "Free online hash generator. Compute MD5, SHA-1, SHA-256, and SHA-512 hashes instantly in your browser. No data uploaded.",
};

export default function HashGeneratorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Hash Generator</h1>
        <p className="text-gray-500 text-sm">
          Enter text to compute MD5, SHA-1, SHA-256, and SHA-512 hashes. All processing happens in your browser.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <HashClient />
        </div>
      </div>
    </div>
  );
}
