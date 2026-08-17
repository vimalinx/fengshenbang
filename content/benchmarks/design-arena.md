---
id: design-arena
name: Design Arena
category: arena
organizer: Arcada Labs（YC S25），2025-07 上线
url: https://designarena.ai/leaderboard
aliases: []
traits:
  - 四人锦标赛制：同题出稿、5 场两两匿名对战排 1-4 名
  - 按品类独立出榜（网站/UI/游戏/数据可视化/图像/视频）
  - Bradley-Terry 迭代收敛，Rating = 400 × log₁₀(strength)
  - 不足 50 场对比不上主榜，低样本标 preliminary
  - Builders（IDE 建站工具）/ Agents 赛道 + 公开 API
facts:
  - label: 主办方
    value: Arcada Labs，YC 2025 夏季批次（S25）
  - label: 上线
    value: 2025-07，designarena.ai
  - label: 机制
    value: 4 模型锦标赛：同题出稿，5 场匿名两两对战排出 1-4 名
  - label: 算法
    value: Bradley-Terry，Rating = 400 × log₁₀(strength)
  - label: 上榜门槛
    value: 不足 50 场对比不上主榜，不足约 200 场标 preliminary
  - label: 赛道
    value: 模型 / Builders（IDE 建站工具）/ Agents，分品类出榜，公开 API
frontier:
  value: null
  note: >-
    分品类 Elo，无 0-100 口径。参照点：Website 品类 2026-07 的 BenchLM 镜像数据显示 GLM-5.2 Elo 1340、o3 1067；三个视频品类
    2026-03 起由 Grok Imagine 居首（第三方报道）。
openSource:
  status: partial
  url: https://docs.designarena.ai/api-reference/overview
  note: 榜单页面与文档化 API 公开（API 需申请 key 并遵守署名要求），方法论笔记公开；原始投票数据与评测代码未公开
history:
  - date: 2025-07
    event: Arcada Labs（YC S25）上线 Design Arena，主打「测 AI 的设计品味」
  - date: 2025 下半年
    event: 扩出 Builders（IDE 建站工具）与 Agents 赛道，并开放公开 API
  - date: 2026-03
    event: Grok Imagine 同时登顶 Video / Video Editing / Image-to-Video 三个视频品类（第三方报道）
ladder:
  - model: Kimi K3
    score: "1370"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: Gemini 3.7 Flash
    score: "1335"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: GPT-5.6 Sol
    score: "1334"
    note: 官方榜 2026-08（Medium/XHigh 两变体同分 1334，取其一）
  - model: Muse Spark 1.2
    score: "1329"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: Claude Opus 5
    score: "1328"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: GLM-5.2
    score: "1321"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: Claude Fable 5
    score: "1314"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: Gemini 3.6 Flash
    score: "1314"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: Claude Opus 4.7
    score: "1307"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: Grok 4.6
    score: "1305"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: Claude Opus 4.6
    score: "1304"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
  - model: Grok 4.5
    score: "1303"
    note: 官方榜 2026-08（designarena.ai Website 品类 Elo）
relatedIds:
  - webdev-arena
  - lmarena
---

## 一句话

四个 AI 匿名比设计，真人盲投排出名次

## 测什么

专测 AI「设计品味」的众包盲测榜：传统榜单测功能对不对，它测东西好不好看、有没有审美。覆盖网站、UI 组件、游戏、数据可视化、图像、视频等品类，各品类独立出榜。除直接比基础模型外，还设 Builders 赛道对比 Lovable 类 IDE 建站工具、以及 Agents 赛道。官方把自己定位成「一面镜子而非记分牌」——观察当前模型在设计上的真实水平和风格倾向。

## 怎么测

特色是四人锦标赛制：每轮从模型池随机抽 4 个模型（另备 1 个替补），同一 prompt 同时出稿，匿名两两对战共 5 场（初赛 2 场 + 胜/负者组 + 加赛），用户逐场投票，最终把 4 份作品排出 1-4 名，每场对比计一票。票数喂给 Bradley-Terry 模型迭代收敛（阈值 0.0001 或 200 轮），Rating = 400 × log₁₀(strength)；不足 50 场对比的模型不上主榜，不足约 200 场的标记为 preliminary。模型身份全程隐藏防品牌滤镜，榜单有公开 API。

## 典型任务

比如用户输入「给我做一个极简风的咖啡订阅落地页」，4 个匿名模型同时交出整页设计，用户挨个翻看，两两对比投票直到排出名次；或者「设计一个数据仪表盘」「做一张专辑封面」，图像和视频品类同理——同一段文案各家出图出片，盲投最顺眼的那个。Builders 赛道则是同一句话丢给不同的 AI 建站工具，比谁一键生成的网站更能看。

## 分数怎么看

榜单同时报 Elo 式 Rating 和胜率，看同一品类内的分差才有意义，不要跨品类比（做网站强不代表出图强）。新模型票数少时排名波动大，官方对低样本模型标 preliminary，看榜时留意。

## 含金量与局限

2025 年中才上线的草根新榜，样本量和投票者构成都远不如 LMArena 稳定；「品味」本身高度主观，头部差距往往靠审美偏好而非硬伤拉开。Builders 赛道官方自承只是 best-effort 的一发式对比，多轮迭代等真实使用方式尚未覆盖。

## 冷知识

官方把定位写成「一面镜子，而非记分牌」，还顺手公开了用户 prompt 的十四大类分布统计——也就是说它不仅评比 AI 的设计，还顺带记录「大家到底最想用 AI 设计什么」。
