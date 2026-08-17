# 封神榜 · 大模型游戏化 Wiki

一个用游戏 Wiki 方式整理大模型生态的纯前端静态站点：模型是「角色」，Harness 是「装备」，配队、攻略、测试集（Benchmark）图鉴一应俱全。

## 页面

- **首页**：数据快照概览、梯队榜速览、场景与配队推荐
- **角色图鉴**（`/models`）：42 个大模型的详情页——榜单成绩、社区口碑（分平台情绪/弹幕/锐评）、版本变迁、装备适配、争议事件、信源
- **装备库**（`/harnesses`）：Claude Code / Cursor / OpenHands 等 Harness 档案
- **配队推荐**（`/teams`）：旗舰队 / 性价比队 / 平民队
- **攻略中心**（`/guides`）：目前仅 1 篇有正文，其余 25 条为**待撰写选题**，开放认领
- **测试集图鉴**（`/benchmarks`）：74 个真实存在的评测基准档案——测什么、怎么测、典型任务长什么样、分数怎么看、含金量与局限、分数天梯、开源状态、本站模型战绩
- **对比 / 更新日志 / 场景 / 工具** 等

## 技术栈

React 19 + Vite 7 + TypeScript + Tailwind CSS 3 + react-router 7 + framer-motion + recharts。纯前端，无后端，数据全部内置。

## 本地运行

```bash
cd app
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 app/dist/
```

## 目录结构

```
app/src/data/            # 全部站点数据（TS 结构化文件）
  models.ts              # 模型卡片与六维属性
  details/<id>.ts        # 每个模型的详情页数据（社区反馈、榜单成绩等）
  benchmarks.ts          # 测试集图鉴：类型 + 聚合 + 战绩反查
  benchmarks/<id>.ts     # 每个 benchmark 一条档案
  harnesses.ts / teams.ts / guides.ts / ...
app/src/pages/           # 页面
research-addenda/        # 模型调研笔记（每个模型一份，数据的来源依据）
benchmark-research/      # 测试集调研：正名总表、联网核验报告、撰写规范
content/                 # 早期内容 schema 试验（zz-test 样例）
src/                     # 早期 Next.js 原型，已停止维护，现行站点在 app/
```

## 数据与调研规范

**哪些是事实，哪些是本站评估——这条界线本仓库严格区分：**

| 类别 | 内容 | 可追溯性 |
|---|---|---|
| 可核实事实 | 榜单成绩、价格、上下文窗口、发布日期、社区引文与热度快照、benchmark 的题量/协议/开源状态 | 逐条对应 `research-addenda/`、`benchmark-research/` 下的调研笔记 |
| 站点主观评估 | 「综合战力」`composite`、六维属性 `stats`、Harness 契合度 `pct`、社区体感雷达、情绪比例 | 无实测支撑，UI 上标注为「站点评分」，不得当实测引用 |
| 游戏化包装 | 场景的积分/徽章、每周增益 `buff` | 本站并无对应机制，纯风味文案 |

取数规则：官方数据只信官方公告，社区引文记录平台与热度快照，估算值一律进 `uncertainties` 诚实标注。详见根目录 `model-research-requirements.md` 与 `model-detail-checklist.md`。

本站无遥测、无用户账号，因此**不存在**任何「使用率」「阅读量」「通关率」类数据；此前版本中的这类占位数字已全部移除。`更新日志` 的每一条对应仓库里一个真实 commit。

## 声明

本站为个人学习/娱乐项目，与所列厂商无隶属关系。榜单分数、价格、社区评价均来自公开渠道调研整理，具有时效性，请以各官方渠道为准。

## License

MIT
