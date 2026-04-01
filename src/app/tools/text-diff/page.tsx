import type { Metadata } from "next";
import DiffClient from "./diff-client";

export const metadata: Metadata = {
  title: "Text Diff - Compare Two Texts Online",
  description:
    "Free online text diff tool. Compare two blocks of text side by side and see the differences highlighted. Runs entirely in your browser.",
};

export default function TextDiffPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Text Diff</h1>
        <p className="text-gray-500 text-sm">
          Compare two blocks of text and see the differences highlighted line by line.
        </p>
      </div>
      <DiffClient />
    </div>
  );
}
