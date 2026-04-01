import type { Metadata } from "next";
import PasswordClient from "./password-client";

export const metadata: Metadata = {
  title: "Password Generator - Generate Secure Random Passwords",
  description:
    "Free online password generator. Create strong, random passwords with customizable length and character sets. Runs entirely in your browser.",
};

export default function PasswordGeneratorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Password Generator</h1>
        <p className="text-gray-500 text-sm">
          Generate strong, random passwords. Customize length and character types. Everything runs locally in your browser.
        </p>
      </div>
      <div className="flex-1">
        <PasswordClient />
      </div>
    </div>
  );
}
