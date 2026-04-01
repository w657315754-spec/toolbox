import type { Metadata } from "next";
import HtmlEntityClient from "./html-entity-client";

export const metadata: Metadata = {
  title: "HTML Entity Encoder/Decoder - Encode & Decode HTML Entities",
  description:
    "Free online HTML entity encoder and decoder. Convert special characters to HTML entities and vice versa. Runs entirely in your browser.",
};

export default function HtmlEntityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">HTML Entity Encoder / Decoder</h1>
        <p className="text-gray-500 text-sm">
          Encode special characters to HTML entities or decode HTML entities back to text.
        </p>
      </div>
      <div className="flex-1">
        <HtmlEntityClient />
      </div>
    </div>
  );
}
