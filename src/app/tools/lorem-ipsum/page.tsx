import type { Metadata } from "next";
import LoremClient from "./lorem-client";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Placeholder Text",
  description:
    "Generate Lorem Ipsum placeholder text for your designs and mockups. Customize paragraph count. Free online tool.",
};

export default function LoremIpsumPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Lorem Ipsum Generator</h1>
        <p className="text-gray-500 text-sm">
          Generate placeholder text for your designs and layouts. Customize the number of paragraphs.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <LoremClient />
        </div>
      </div>
    </div>
  );
}
