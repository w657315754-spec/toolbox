# ToolBox - 免费在线开发工具集

纯前端在线工具集合，所有数据在浏览器本地处理，不上传服务器。

## 技术栈

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- 部署目标：Vercel

## 可用工具

| 工具 | 路径 | 说明 |
|------|------|------|
| JSON 格式化 | `/tools/json-formatter` | JSON 美化、压缩、语法校验 |

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 构建

```bash
npm run build
```

## 部署

推送到 GitHub 后在 Vercel 导入即可，零配置部署。

## 添加新工具

1. 在 `src/app/tools/` 下创建新目录
2. 添加 `page.tsx`（服务端组件，含 metadata）和客户端组件
3. 在 `src/app/page.tsx` 的 `tools` 数组中添加卡片信息
4. 在 `src/app/layout.tsx` 的导航中添加链接

## 广告位

已预留注释占位（搜索 `Ad Slot`）：
- 顶部 Banner（layout.tsx）
- 工具卡片下方（page.tsx 首页）
- 工具页侧边栏（json-formatter/page.tsx）
