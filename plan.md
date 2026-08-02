# 封神榜 (fengshenbang) — 大模型 × Harness 游戏化 Wiki 建站计划

## 需求确认
- 形态：对标原神 Wiki（如 biligame 原神 wiki）的界面与排布 —— Wiki 式布局（顶部导航 + 侧边栏 + 内容区 + 卡片矩阵）
- 概念映射：模型小版本=角色、模型系列=体系、Harness=装备、综合 Harness=配队、使用技巧=攻略/打法
- 视觉：明亮主题（亮色底）、特效优雅且含蓄（不喧宾夺主的微动效）、明显风格化（封神/东方幻想 + 现代科技感）
- 范围：**纯前端静态站点，不做后端**。内容用内置 mock 数据（真实感的大模型/harness 数据）
- 交付：React + Vite + Tailwind 前端项目，最终保存网站版本供预览

## 页面规划
1. **首页**：游戏 Wiki 经典首页 —— 头图/横幅、当期 UP（当期 T0 模型轮换推荐）、热门角色速览、最新攻略、版本公告/更新日志
2. **角色图鉴**（模型）：卡片矩阵 + 详情（属性面板：能力雷达、上下文、价格；技能=擅长场景；命座=版本迭代）
3. **体系图鉴**（模型系列）：GPT 系 / Claude 系 / Gemini 系 / DeepSeek 系 / Qwen 系 / Kimi 系等
4. **装备库**（Harness）：Cline / Cursor / Claude Code / OpenHands 等，属性加成、适配角色
5. **配队推荐**：当期最优配队（旗舰队 / 性价比队 / 平民队），轮换更新机制展示
6. **攻略中心**：按编程场景分类的打法攻略（前端冲分、长程重构、Agent 开发等）

## 执行阶段

### Stage 1 — 加载技能 & 搭建
- 加载 `vibecoding-webapp-swarm`（React 工作流）与 `webapp-building-swarm`（实现细节）
- 按技能规范派发设计 + 实现子代理（swarm-workspace 如需）
- 设计基调：亮白纸感底 + 封神金/朱砂点缀 + 云纹/卷轴等东方纹样细节；动效用克制的 hover 浮起、卡片光晕、入场渐显
- 产出：完整可构建的 React 项目

### Stage 2 — 验证
- 构建通过、页面完整、视觉验收（截图检查）
- 不合格则派发修复子代理

### Stage 3 — 交付
- `mshtools-website_version_manager` build_version 保存版本，用户通过版本卡片预览
