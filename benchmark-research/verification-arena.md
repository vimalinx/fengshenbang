# 核验报告 · 综合榜/Arena（2026-08-13 联网核验）

## LMArena（Chatbot Arena → 2026-01-28 更名「Arena」）— REAL
- 主办方：起源 UC Berkeley LMSYS Org（2023-04），2025-04 独立为公司 Arena Intelligence Inc.，2026-01-28 更名 Arena，域名 arena.ai（lmarena.ai 仍可用）；论文 arXiv:2403.04132
- 测什么：真实用户匿名双模型对战盲投，按人类偏好排名；子榜：总榜/文本、WebDev、视觉、编程、搜索、文生图等
- 计分：Bradley-Terry 模型拟合 Elo + 置信区间
- 链接：https://arena.ai/leaderboard
- 备注：融资 $100M 种子（2025-05）+ $150M A 轮（2026-01，估值 $1.7B）。**「Arena.ai 综合榜」= 本条新名字，合并；「编程盲测挑战赛」中文叫法也归入本条/WebDev。**

## WebDev Arena — REAL（LMArena 子榜，图鉴单列条目但注明从属）
- 主办方：LMArena，2024 底上线（web.lmarena.ai）
- 测什么：同一 prompt 两模型现场生成完整网页应用（React+TS+Tailwind），用户盲投好用又好看的一方；约 6.1 万票、平局率 26%
- 计分：crowdsourced Elo（Bradley-Terry）
- 链接：https://web.lmarena.ai
- 备注：站内别名极多（Website Arena/Code Arena WebDev/Frontend Code Arena 等）。

## Design Arena — REAL
- 主办方：Arcada Labs，YC S25，2025-07 上线（designarena.ai）
- 测什么：AI 设计「品味」：网站/UI 组件/游戏/数据可视化/图像/视频等品类，多模型匿名产出用户盲投；Builders（IDE 工具）与 Agents 三赛道
- 计分：持续 Elo 锦标赛，分品类榜；公开 API
- 链接：https://designarena.ai/leaderboard

## BenchLM — REAL（聚合榜，保留但降权注明）
- 主办方：benchlm.ai 独立站点（主体未披露），数据刷新至 2026-08
- 测什么：不自建考题，索引 414 个外部基准 + 价格/速度，产出综合排名
- 计分：私有加权合成「BenchAlign」v5.2：8 类加权（Agentic 22%/Coding 20%/Reasoning 17%…）、27 个计权基准归一化；Supported/Estimated 标证据强度
- 链接：https://benchlm.ai/
- 备注：二手聚合榜、方法论私有，权威性不及 LMArena/AA，档案注明属性。

## AA Intelligence Index — REAL
- 主办方：Artificial Analysis（独立第三方评测机构）
- 测什么：MMLU-Pro/GPQA/HLE/SciCode/AIME 等难度型基准合成「智能指数」，与价格/速度并列
- 计分：组成基准归一化加权合成指数；模型页披露子项
- 链接：https://artificialanalysis.ai/leaderboards/models
- 备注：站内别名：AA 智能指数/AA 综合评测/AAII/AA Agentic/AA Coding Agent Index/AA-Briefcase（后几个为细分指数）。

## GDPval — REAL
- 主办方：OpenAI，2025-09/10，arXiv:2510.04374
- 测什么：「真实经济价值工作」：44 种职业、9 大行业 1320 任务（写报告/做 PPT/画图纸，人类专家平均 7h 的活）；gold 子集 220 题公开
- 计分：行业专家盲评模型产物 vs 人类产物，win/tie 率
- 链接：https://openai.com/index/gdpval/
- 备注：**GDPval-AA** = Artificial Analysis 用自己的配对比较流程复跑的 Elo 榜（https://artificialanalysis.ai/evaluations/gdpval-aa），同族注明。

## EQ-Bench — REAL
- 主办方：Samuel Paech（个人），arXiv:2312.06281；eqbench.com
- 测什么：主榜测情感智力；Creative Writing v3 测创意写作（32 prompt × 3 轮迭代）；另有 Spiral-Bench 等衍生
- 计分：LLM-as-judge rubric；Creative Writing v3 混合 rubric + Elo
- 链接：https://eqbench.com/
- 备注：草根但被广泛引用。

## LiveBench — REAL
- 主办方：Abacus.AI/NYU/NVIDIA/USC/UMD（Yann LeCun 等），arXiv:2406.19314
- 测什么：防污染通用能力：数学/编程/推理/语言/指令遵循/数据分析 6-7 类 20+ 客观题，题目按月/半年滚动更新
- 计分：客观 ground-truth 自动判分（不用 LLM judge），类目分+总分
- 链接：https://livebench.ai/
- 备注：站内「LiveBench Coding」为其编程类目分。
