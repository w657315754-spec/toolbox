import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ToolBox - Free Online Developer Tools",
    template: "%s | ToolBox",
  },
  description:
    "ToolBox provides free, fast, no-signup online developer tools including JSON formatter, encoding converters, hash generators, and more.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools/json-formatter", label: "JSON" },
  { href: "/tools/base64", label: "Base64" },
  { href: "/tools/url-encoder", label: "URL" },
  { href: "/tools/timestamp", label: "Timestamp" },
  { href: "/tools/color-converter", label: "Color" },
  { href: "/tools/hash-generator", label: "Hash" },
  { href: "/tools/uuid-generator", label: "UUID" },
  { href: "/tools/regex-tester", label: "Regex" },
  { href: "/tools/jwt-decoder", label: "JWT" },
  { href: "/tools/password-generator", label: "Password" },
  { href: "/tools/text-diff", label: "Diff" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600 shrink-0">
              🧰 ToolBox
            </Link>
            <nav className="flex items-center gap-3 text-sm overflow-x-auto ml-6 scrollbar-hide">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors shrink-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} ToolBox. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
