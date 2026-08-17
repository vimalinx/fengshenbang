---
id: swe-bench-pro
name: SWE-bench Pro
category: coding
organizer: Scale AI，2025-09（arXiv:2509.16941）
url: https://scale.com/research/swe_bench_pro
aliases:
  - SWE-Bench Pro
  - 上代参考 · SWE-bench Pro
  - SWE-bench Pro（3.1 Pro 参考）
  - SWE-Bench Pro 编程榜
traits:
  - 真实企业级任务
  - 多文件大改
  - 抗污染设计（GPL 仓库+私有代码库）
  - 统一 SWE-Agent 脚手架
  - 仅 public 集公开榜单
facts:
  - label: 题量
    value: 1865 题 / 41 仓库（public 731、held-out 858、commercial 276）
  - label: 发布
    value: 2025-09（Scale AI，arXiv:2509.16941）
  - label: 计分
    value: "% Resolved（pass@1），统一 SWE-Agent 脚手架"
  - label: 任务规模
    value: 参考补丁平均 107.4 行、跨 4.1 个文件，每题至少改 10 行
  - label: 数据公开性
    value: 仅 public 集公开；held-out 保密防刷榜，commercial 只公布分数
  - label: 抗污染设计
    value: public/held-out 全选 GPL 系 copyleft 仓库，commercial 为购买的创业公司私有代码库
frontier:
  value: 69
  note: 论文发布时（2025-09）GPT-5 仅 23.3%、Claude Opus 4.1 为 22.7%；按 2026-08 核验口径前沿模型已到约 23%–69%，远未饱和。
openSource:
  status: partial
  url: https://github.com/scaleapi/SWE-bench_Pro-os
  note: >-
    public 集（731 题）与评测代码在 GitHub（scaleapi/SWE-bench_Pro-os）公开；held-out（858 题）保密防刷榜，commercial（276
    题）为购买的私有代码库，仅公布分数
history:
  - date: 2025-09
    event: 发布：统一 SWE-Agent 脚手架下最强模型不到 25%，与 Verified 的 70%+ 形成鲜明落差
  - date: 2026-02
    event: OpenAI 弃用 SWE-bench Verified，行业重心转向 Pro
  - date: "2026"
    event: 头部模型公开集分数爬到约 69%，商业集仍是硬骨头（发布时全军不到 20%）
ladder:
  - model: Claude Mythos 5
    score: 80.3%
    note: BenchLM 聚合 2026-08-15
  - model: Claude Fable 5
    score: 80.0%
    note: BenchLM 聚合 2026-08-15
  - model: Claude Opus 5
    score: 79.2%
    note: BenchLM 聚合 2026-08-15；Anthropic 自报同值
  - model: Sakana Fugu-Ultra
    score: 73.7%
    note: BenchLM 聚合 2026-08-15
  - model: Claude Opus 4.8
    score: 69.2%
    note: BenchLM 聚合 2026-08-15
  - model: Qwen3.8 Max
    score: 67.7%
    note: BenchLM 聚合 2026-08-15；开源权重最佳
  - model: Grok 4.5
    score: 64.7%
    note: BenchLM 聚合 2026-08-15
  - model: GPT-5.6 Sol
    score: 64.6%
    note: BenchLM 聚合 2026-08-15
  - model: Claude Opus 4.7 (Adaptive)
    score: 64.3%
    note: BenchLM 聚合 2026-08-15
  - model: GPT-5.6 Terra
    score: 63.4%
    note: BenchLM 聚合 2026-08-15
  - model: Claude Sonnet 5
    score: 63.2%
    note: BenchLM 聚合 2026-08-15
  - model: GPT-5.6 Luna
    score: 62.7%
    note: BenchLM 聚合 2026-08-15
relatedIds:
  - swe-bench-verified
  - swe-bench-multilingual
---

## 一句话

Verified 的加难防背题版，企业级修 bug 考试

## 测什么

1865 个来自 41 个活跃仓库的企业级任务，刻意解决 SWE-bench Verified 的两大痛点：一是太简单（Verified 的 500 题里有 161 题只需改一两行），二是易污染。Pro 只收需要多文件大改的任务——参考补丁平均 107.4 行、横跨 4.1 个文件，每题至少改 10 行，超过 100 题要改 100 行以上。防污染手段很硬核：公开集全部选自 GPL 等强 copyleft 协议仓库（法律上难以进入商业训练语料），商业集干脆买下创业公司的私有代码库出题。

## 怎么测

与 SWE-bench 同宗：agent 拿到任务描述和仓库，产出补丁，跑 fail-to-pass 加 pass-to-pass 测试，全过算 Resolved，报 % Resolved。但输入比 Verified 更「贴心」：除了改写过的问题陈述，还附人工撰写的需求清单（requirements）和接口约定（明写测试期望的类名、函数名，避免「功能对但名字起错」的冤案）。评测在与语言匹配的容器环境里进行（Python 虚拟环境、Node.js、Go module 等），环境以预构建 Docker 镜像发布。数据集分 public（731 题，公开带官方榜单）、held-out（858 题，保密防刷榜）、commercial（276 题，创业公司私有代码，只公布分数）三部分。

## 典型任务

论文给出的任务形态是：一道题可能来自一个 B2B 平台仓库，问题陈述说「给 API 增加某功能」，附带的 requirements 会列出一条条具体验收条件——比如明确规定新增路由的名字和行为，但不规定你怎么实现。参考答案往往要同时改动接口层、业务逻辑和测试相关文件，合计上百行。对比 Verified 里大量「改一行正则」的题，这里的每道题更像工程师真实的一周工作量（论文定位为专业人士数小时到数天的任务）。

## 分数怎么看

发布时（2025-09）在统一 SWE-Agent 脚手架下，GPT-5 只有 23.3%、Claude Opus 4.1 为 22.7%，商业集更是全军不到 20%——对比 Verified 的 70%+，差距肉眼可见。按核验口径，目前前沿模型约 23%–69%，分数拉开了档次，是当前衡量顶尖编程 agent 更可信的一把尺。

## 含金量与局限

三个子集难度和用途不同：只有 public 集有公开榜单，held-out 和 commercial 的分数别与 public 混着比。另外分数与脚手架强相关（论文里 Agentless 因不擅多文件编辑得分明显更低），引用数字时注意对齐评测用的 agent 框架。

## 冷知识

为了防「背题」，Scale AI 上了两道防线：公开集专挑 GPL 强 copyleft 协议的仓库——厂商把这类代码塞进商业训练语料有法律风险；商业集更直接，花钱买下创业公司的私有代码库出题，模型想背都没处背。用版权法和收购合同出考卷，在 benchmark 圈是头一遭。
