# 🧱 T3 Stack 项目启动规范（含安全机制）

以下内容为每次启动新项目前给 Cline / VS Code AI Agent 的规范指令。
将此文档作为 **项目初始化规则（Project Spec）**，确保开发完全遵守 T3 架构最佳实践，并启用必要的安全机制。

---

## 📌 1. 项目技术栈要求（T3 Stack）

请严格使用以下组件：

### **前端 Frontend**
- Next.js（App Router）
- React + TypeScript
- TailwindCSS（由 Figma 设计系统自动映射）
- Shadcn/UI（组件库，不要随意混用别的 UI 库）

### **后端 Backend（Full‑stack in Next.js）**
- tRPC（不要使用 REST、Express、Nest 等）
- Prisma（ORM + schema 管理）
- Zod（数据校验）
- NextAuth / Clerk / Google OAuth（鉴权，可按项目选一种）

### **数据库 Database**
- **原则**：保持开发与生产环境的一致性 (Dev/Prod Parity)，严禁混用 SQLite 和 Postgres。
- **方案 A (推荐 - 联网)**：
  - 开发环境：Supabase (创建一个专门的 Dev Project)
  - 生产环境：Supabase (Prod Project)
- **方案 B (离线/低延迟)**：
  - 开发环境：本地 Postgres (使用 DBngin 或 Postgres.app 启动，避免使用复杂的 Docker 配置)
  - 生产环境：Supabase
- **ORM**：Prisma

### **部署 Deployment**
- 首选 **Vercel**（T3 官方推荐，也是与 Next.js 最优集成）
- 若需要 Docker 再使用，但不是默认选项
- 自动配置 GitHub repo + Vercel 自动构建

---

## 📌 2. 项目生成方式

请使用：
```
npx create-t3-app@latest
```

或让 agent 生成等价的结构：
- apps/
- src/
- server/
- components/
- prisma/
- env.ts

并保证：
- 所有 API 通过 `tRPC router` 暴露
- 所有 DB 结构通过 `schema.prisma` 定义
- 所有输入输出都通过 `zod` 校验

---

## 📌 3. 设计 → 前端实现规范

### Design System (Figma → Tailwind)
- Figma 构建设计系统：颜色、字体、间距、组件
- 输出方式：截图、CSS token、或 Figma 代码 → agent
- Agent 必须：
  - 用 Tailwind 映射 Figma token（如 `text-gray-700`、`bg-primary/20`）
  - 使用 Shadcn 组件而不是自己写重复代码

---

## 📌 4. 后端开发规范（为了解耦和安全）

### tRPC
- 每个功能模块 = 一个 router
- 逻辑必须分离到 `server/api/routers/...`
- 客户端通过自动生成的 hooks 调用

### Prisma
- 所有数据结构定义在 `prisma/schema.prisma`
- 禁止手写 SQL（除非必要）
- 每次修改 schema 必须执行：
```
npx prisma migrate dev
```

---

## 📌 5. API 安全机制（新增）

所有以下安全机制必须启用：

### **① 环境变量保护（ENV）**
不要在代码中暴露任何密钥。
所有敏感信息必须放在：
- `.env.local`（本地）
- `.env.production`（部署）

必须通过 TypeScript 安全验证：
```
import { env } from "~/env";
```

### **② 认证与用户会话安全（Auth）**
根据项目选择以下之一：
- **NextAuth**（免费、常用）
- **Clerk**（更易用）
- **Auth.js + OAuth（Google）**

要求：所有受保护的 tRPC 端点必须做 session 检查。

### **③ tRPC Input 校验（防注入）**
所有 API 都必须使用 Zod 进行校验：
```
input: z.object({ id: z.string().uuid() })
```
避免：SQL 注入、XSS、恶意输入。

### **④ CORS、Rate limit（若有外部 API）**
如果项目暴露 API，要设定：
- CORS 限制域名
- 限流（Vercel Edge Middleware）

### **⑤ 外部大模型 API（OpenAI/Gemini）安全**
- 不能把 key 放在客户端
- 统一通过 tRPC server 调用 AI API
- 客户端 → tRPC → Node server → AI

### **⑥ 日志和错误监控（生产环境必需）**
- 使用 Vercel Observability 或 Sentry
- 捕捉前端/后端/数据库错误

---

## 📌 6. MCP / AI Agent 使用规范

当使用 Cline / MCP 时：
- 仅允许它执行文件读写、运行本地命令
- 不允许直接访问未授权路径
- 任何 destructive 操作（删除）必须确认
- 所有 AI 修改必须创建 Git commit

Git 流程：
```
git add .
git commit -m "feat: message"
git push
```

---

## 📌 7. 部署流程（Vercel 优先）

1. 连接 GitHub repo
2. 自动识别 Next.js
3. 自动注入环境变量
4. 自动执行构建 + 部署

不要使用 Docker 除非有：
- 自定义运行环境
- 企业级需求

---

## 📌 8. 最后要求（非常重要）
在执行任何开发前，AI 需要：
- 复述需求
- 提出架构设计方案
- 给出文件更改清单（Diff Plan）
- 经过你确认后再执行操作

---

如需扩展更多内容（如多环境部署、TurborRepo、E2E 测试、CI/CD），我可以继续扩充文档。

