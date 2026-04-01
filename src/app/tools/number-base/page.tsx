import type { Metadata } from "next";
import NumberBaseClient from "./number-base-client";

export const metadata: Metadata = {
  title: "Number Base Converter - Binary, Octal, Decimal, Hex",
  description:
    "Free online number base converter. Convert between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) instantly.",
};

export default function NumberBasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Number Base Converter</h1>
        <p className="text-gray-500 text-sm">
          Convert numbers between binary, octal, decimal, and hexadecimal. Type in any field to convert.
        </p>
      </div>
      <div className="flex-1">
        <NumberBaseClient />
      </div>
    </div>
  );
}
