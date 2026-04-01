import type { Metadata } from "next";
import MarkdownClient from "./markdown-client";

export const metadata: Metadata = {
  title: "Markdown Preview - Live Markdown Renderer",
  description:
    "Free online Markdown live preview tool. Write Markdown and see the rendered HTML in real time. No data uploaded.",
};

export default function MarkdownPreviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Markdown Preview</h1>
        <p className="text-gray-500 text-sm">
          Write Markdown on the left and see the rendered preview on the right in real time.
        </p>
      </div>
      <MarkdownClient />
    </div>
  );
}
