import Link from "next/link";

const tools = [
  {
    name: "JSON 格式化",
    description: "在线 JSON 格式化、压缩、校验工具，支持语法错误高亮提示。",
    href: "/tools/json-formatter",
    icon: "{ }",
  },
  // 后续工具在此追加
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          免费在线开发工具集
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          快速、免费、无需注册。所有工具均在浏览器本地运行，数据不会上传到服务器。
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

      {/* === Ad Slot: Below Tool Cards === */}
      {/* <div className="mt-12 h-[250px] bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">Ad Slot</div> */}
    </div>
  );
}
