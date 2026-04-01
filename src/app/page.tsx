import Link from "next/link";

const tools = [
  {
    name: "JSON Formatter",
    description: "Format, minify, and validate JSON with syntax error highlighting.",
    href: "/tools/json-formatter",
    icon: "{ }",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 strings. Supports file drag & drop.",
    href: "/tools/base64",
    icon: "B64",
  },
  {
    name: "URL Encoder/Decoder",
    description: "URL encode and decode with encodeURIComponent / encodeURI modes.",
    href: "/tools/url-encoder",
    icon: "%20",
  },
  {
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates. Supports seconds & milliseconds.",
    href: "/tools/timestamp",
    icon: "⏱",
  },
  {
    name: "Color Converter",
    description: "Convert between HEX, RGB, and HSL color formats with live preview.",
    href: "/tools/color-converter",
    icon: "🎨",
  },
  {
    name: "Hash Generator",
    description: "Compute MD5, SHA-1, SHA-256, and SHA-512 hashes instantly in your browser.",
    href: "/tools/hash-generator",
    icon: "#️⃣",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUID v4 identifiers. Supports bulk generation.",
    href: "/tools/uuid-generator",
    icon: "🆔",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and mockups.",
    href: "/tools/lorem-ipsum",
    icon: "📝",
  },
  {
    name: "Markdown Preview",
    description: "Write Markdown and see the rendered HTML preview in real time.",
    href: "/tools/markdown-preview",
    icon: "📄",
  },
  {
    name: "Regex Tester",
    description: "Test regular expressions with real-time match highlighting and group extraction.",
    href: "/tools/regex-tester",
    icon: ".*",
  },
  {
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Token header, payload, and signature.",
    href: "/tools/jwt-decoder",
    icon: "🔑",
  },
  {
    name: "HTML Entity Encoder",
    description: "Encode special characters to HTML entities or decode them back.",
    href: "/tools/html-entity",
    icon: "&lt;",
  },
  {
    name: "Number Base Converter",
    description: "Convert numbers between binary, octal, decimal, and hexadecimal.",
    href: "/tools/number-base",
    icon: "0x",
  },
  {
    name: "Password Generator",
    description: "Generate strong, random passwords with customizable length and character sets.",
    href: "/tools/password-generator",
    icon: "🔒",
  },
  {
    name: "Text Diff",
    description: "Compare two blocks of text side by side with highlighted differences.",
    href: "/tools/text-diff",
    icon: "±",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Free Online Developer Tools
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Fast, free, no sign-up required. All tools run locally in your browser — your data never leaves your device.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="text-3xl mb-3 font-mono text-blue-600">
              {tool.icon}
            </div>
            <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </h2>
            <p className="text-sm text-gray-500">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
