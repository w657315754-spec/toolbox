import type { Metadata } from "next";
import JsonFormatter from "./json-formatter-client";

export const metadata: Metadata = {
  title: "JSON 格式化工具 - 在线美化/压缩/校验",
  description:
    "免费在线 JSON 格式化工具，支持 JSON 美化、压缩、语法校验，纯浏览器端处理，数据安全不上传。",
};

export default function JsonFormatterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">JSON 格式化工具</h1>
        <p className="text-gray-500 text-sm">
          在左侧粘贴 JSON，右侧实时查看格式化结果。支持美化、压缩、语法校验。
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <JsonFormatter />
        </div>

        {/* === Ad Slot: Sidebar === */}
        {/* <aside className="hidden lg:block w-[300px] shrink-0">
          <div className="sticky top-20 h-[600px] bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">
            Sidebar Ad
          </div>
        </aside> */}
      </div>
    </div>
  );
}
