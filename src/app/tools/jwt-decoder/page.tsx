import type { Metadata } from "next";
import JwtClient from "./jwt-client";

export const metadata: Metadata = {
  title: "JWT Decoder - Decode JSON Web Tokens Online",
  description:
    "Free online JWT decoder. Paste a JWT token to decode and inspect its header, payload, and signature. No data uploaded.",
};

export default function JwtDecoderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">JWT Decoder</h1>
        <p className="text-gray-500 text-sm">
          Paste a JSON Web Token to decode and inspect its header, payload, and signature.
        </p>
      </div>
      <div className="flex-1">
        <JwtClient />
      </div>
    </div>
  );
}
