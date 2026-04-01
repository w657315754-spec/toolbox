import type { Metadata } from "next";
import RegexClient from "./regex-client";

export const metadata: Metadata = {
  title: "Regex Tester - Test Regular Expressions Online",
  description:
    "Free online regex tester. Test your regular expressions against sample text with real-time match highlighting and group extraction.",
};

export default function RegexTesterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Regex Tester</h1>
        <p className="text-gray-500 text-sm">
          Test your regular expressions with real-time matching, highlighting, and capture group extraction.
        </p>
      </div>
      <div className="flex-1">
        <RegexClient />
      </div>
    </div>
  );
}
