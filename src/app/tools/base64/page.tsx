import type { Metadata } from "next";
import Base64Tool from "./base64-client";

export const metadata: Metadata = {
  title: "Base64 编解码工具 - 在线编码/解码",
  description:
    "免费在线 Base64 编解码工具，支持文本编码、Base64 解码、文件拖拽编码，纯浏览器端处理，数据安全不上传。",
};

export default function Base64Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Base64 编解码工具</h1>
        <p className="text-gray-500 text-sm">
          输入文本进行 Base64 编码，或输入 Base64 字符串进行解码。支持文件拖拽编码。
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Base64Tool />
        </div>
      </div>
    </div>
  );
}
