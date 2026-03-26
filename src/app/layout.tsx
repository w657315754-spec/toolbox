import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ToolBox - 免费在线开发工具集",
    template: "%s | ToolBox",
  },
  description:
    "ToolBox 提供免费、快速、无需注册的在线开发工具，包括 JSON 格式化、编码转换等。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        {/* === Ad Slot: Top Banner === */}
        {/* <div className="w-full h-[90px] bg-gray-100 flex items-center justify-center text-sm text-gray-400">Ad Banner</div> */}

        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600">
              🧰 ToolBox
            </Link>
            <nav className="flex items-center gap-4 text-sm overflow-x-auto">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors shrink-0"
              >
                首页
              </Link>
              <Link
                href="/tools/json-formatter"
                className="text-gray-600 hover:text-blue-600 transition-colors shrink-0"
              >
                JSON
              </Link>
              <Link
                href="/tools/base64"
                className="text-gray-600 hover:text-blue-600 transition-colors shrink-0"
              >
                Base64
              </Link>
              <Link
                href="/tools/url-encoder"
                className="text-gray-600 hover:text-blue-600 transition-colors shrink-0"
              >
                URL
              </Link>
              <Link
                href="/tools/timestamp"
                className="text-gray-600 hover:text-blue-600 transition-colors shrink-0"
              >
                时间戳
              </Link>
              <Link
                href="/tools/color-converter"
                className="text-gray-600 hover:text-blue-600 transition-colors shrink-0"
              >
                颜色
              </Link>
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
