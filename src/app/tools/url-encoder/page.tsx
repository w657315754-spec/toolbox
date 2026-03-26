import type { Metadata } from "next";
import UrlEncoderTool from "./url-encoder-client";

export const metadata: Metadata = {
  title: "URL 编解码工具 - 在线 URL Encode/Decode",
  description:
    "免费在线 URL 编解码工具，支持 encodeURIComponent 和 encodeURI 两种模式，实时转换，纯浏览器端处理。",
};

export default function UrlEncoderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">URL 编解码工具</h1>
        <p className="text-gray-500 text-sm">
          输入 URL 或文本进行编码，或输入编码后的字符串进行解码。支持 encodeURIComponent / encodeURI 两种模式。
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <UrlEncoderTool />
        </div>
      </div>
    </div>
  );
}
