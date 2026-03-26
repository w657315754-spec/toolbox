import type { Metadata } from "next";
import ColorConverterTool from "./color-converter-client";

export const metadata: Metadata = {
  title: "颜色转换工具 - HEX/RGB/HSL 互转",
  description:
    "免费在线颜色转换工具，支持 HEX、RGB、HSL 格式互转，实时颜色预览，一键复制 CSS 格式。",
};

export default function ColorConverterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">颜色转换工具</h1>
        <p className="text-gray-500 text-sm">
          HEX、RGB、HSL 颜色格式互转，实时预览颜色，一键复制各种 CSS 格式。
        </p>
      </div>
      <div className="max-w-2xl">
        <ColorConverterTool />
      </div>
    </div>
  );
}
