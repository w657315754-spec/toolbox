import type { Metadata } from "next";
import TimestampTool from "./timestamp-client";

export const metadata: Metadata = {
  title: "时间戳转换工具 - Unix 时间戳与日期互转",
  description:
    "免费在线时间戳转换工具，支持 Unix 时间戳与人类可读日期互转，秒/毫秒切换，实时显示当前时间戳。",
};

export default function TimestampPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">时间戳转换工具</h1>
        <p className="text-gray-500 text-sm">
          Unix 时间戳与人类可读日期互转，支持秒/毫秒切换，实时显示当前时间戳。
        </p>
      </div>
      <TimestampTool />
    </div>
  );
}
