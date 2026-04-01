<!-- BEGIN:goal -->
一、项目目标

使用 Next.js + Vercel AI SDK 构建一个简化的 AI 对话平台，核心功能包括：

- 多模型切换对话
- 流式响应
- Artifacts 面板（代码/文档/表格的展示与编辑）
二、技术栈（最小依赖）


{

"dependencies": {

"ai": "latest",

"@ai-sdk/openai": "latest",

"next": "latest",

"react": "latest",

"react-dom": "latest"

}

}

三、需要实现的功能模块 1. 基础架构

- Next.js 15 (App Router)
- 简单的内存/文件存储替代数据库
- 无认证机制 2. 模型选择系统
- 定义模型配置文件（id、name、provider、capabilities）
- 前端模型选择器 UI
- Cookie 存储当前选中模型
- 后端根据模型 ID 调用对应 AI 3. 流式对话核心
- 前端输入框 + 消息列表
- 后端 /api/chat 接口
- 使用 Vercel AI SDK 的 streamText 实现流式响应
- 消息历史管理（内存 Map） 4. Artifacts 面板（可选扩展）
- 代码/文档/表格的创建与展示
- 实时编辑功能
- 简化版本可先跳过
四、简化策略总结

原项目 简化后 Vercel AI Gateway (多模型) 直接使用 @ai-sdk/openai PostgreSQL + Drizzle ORM 内存 Map 存储 NextAuth 认证 无认证，所有请求放行 Redis 断点续传 跳过，不实现 多 API 路由 只保留 /api/chat Artifacts 版本管理 简化或跳过

五、实现顺序建议


第一步：环境搭建

- 初始化 Next.js 项目

- 安装 ai 和 @ai-sdk/openai

第二步：基础对话

- 创建输入框和消息列表 UI

- 实现 /api/chat 接口

- 配置 OpenAI API Key

- 实现流式响应

第三步：模型选择

- 创建模型配置文件

- 实现前端模型选择器

- 后端根据选择调用不同模型

第四步：消息持久化

- 用内存 Map 存储对话历史

- 刷新页面可加载历史

第五步（可选）：Artifacts

- 添加代码/文档展示面板

- 实现编辑功能

六、环境变量


# .env.local

OPENAI_API_KEY=your-api-key

- 自己实现 useChat hook 和流式处理 ✅
- 使用 Ollama 本地部署模型 + OpenAI 兼容 API
<!-- END:goal -->
