---
id: swe-marathon
name: SWE-Marathon
category: coding
organizer: Abundant 主导，Stanford/UCSB/Harvard/Waterloo 等，2026-06（arXiv:2606.07682）
url: https://swe-marathon.org
aliases:
  - SWE Marathon
  - 上代参考 · SWE Marathon
traits:
  - 20 个超长任务
  - 库复现/产品克隆
  - 二元验证器判分
  - agent 连续作战 2-10 小时
  - 防作弊扫描
facts:
  - label: 题量
    value: 20 个超长任务（8 库复现 + 5 产品克隆 + ML 系统工程/算法优化）
  - label: 发布
    value: 2026-06（arXiv:2606.07682，Abundant 主导）
  - label: 计分
    value: 二元 pass@1：验证器全过记 1 否则记 0，每任务多次重复（论文 5 次 / 现榜 8 次）
  - label: 任务尺度
    value: agent 时限 2–10 小时，单次 rollout 平均约 2720 万 token
  - label: 验收方式
    value: 隐藏测试 + 行为对齐 + 性能门槛，克隆类加 CUA 浏览器实操验收
frontier:
  value: 50
  note: 官网 v1.1 榜单（2026-08 访问）榜首 Claude Opus 5 为 50.0%，Kimi K3 48.1%；2026-06 发布时最强 agent 不足 30%。
openSource:
  status: open
  url: https://swe-marathon.org
  note: 数据集与评测代码经官网发布（swe-marathon.org），任务与验证器公开，官网榜单公开标注 Cheating Attempts
history:
  - date: 2026-06
    event: 论文与基准发布，最强 agent 通过率不足 30%
  - date: 2026-08
    event: 官网榜单 v1.1：Claude Opus 5 以 50.0% 登顶，头部在两个月内明显上移
  - date: 发布以来
    event: 「Rust 写 C 编译器」「Clone Slack」等任务通过率保持 0%，无人能完整通关
ladder:
  - model: Claude Opus 5 (max)/Claude Code
    score: 50.0%
    note: 官方榜 v1.1，2026-08
  - model: Claude Opus 4.8 (max)/Claude Code
    score: 48.8%
    note: 官方榜 v1.1，2026-08
  - model: Kimi K3 (max)/Claude Code
    score: 48.1%
    note: 官方榜 v1.1，2026-08
  - model: Claude Fable 5 (max)/Claude Code
    score: 45.0%
    note: 官方榜 v1.1，2026-08
  - model: GPT-5.6-sol (max)/Codex
    score: 42.5%
    note: 官方榜 v1.1，2026-08
  - model: GPT-5.6-terra (max)/Codex
    score: 32.5%
    note: 官方榜 v1.1，2026-08
  - model: Grok 4.6 (high)/Grok Build
    score: 31.9%
    note: 官方榜 v1.1，2026-08
  - model: Claude Sonnet 5 (max)/Claude Code
    score: 30.0%
    note: 官方榜 v1.1，2026-08
  - model: Grok 4.5 (max)/Grok Build
    score: 29.4%
    note: 官方榜 v1.1，2026-08
  - model: GPT-5.6-luna (max)/Codex
    score: 24.4%
    note: 官方榜 v1.1，2026-08
  - model: GLM 5.2 (max)/Claude Code
    score: 19.4%
    note: 官方榜 v1.1，2026-08
relatedIds:
  - swe-bench-verified
  - terminal-bench
---

## 一句话

让 agent 连干几小时，从零复现整个开源项目

## 测什么

20 个超长周期的项目级任务，分三类：8 个库复现（用另一种语言重写整个项目）、5 个产品克隆（全栈复制 Slack、Excel 这类产品）、再加 ML 系统工程和算法优化任务。任务灵感部分来自评测社区和前沿实验室的著名案例（如 Anthropic 的 C 编译器、OpenAI 的 Parameter Golf）。尺度完全不是修 bug 级别：agent 时限 2–10 小时，人类专家估计要 40–400 小时，单次 rollout 平均消耗数千万 token（论文口径约 2720 万）。测的是「AI 能不能像一支工程团队一样连续作战几天」。

## 怎么测

计分是严格的二元奖励：一个任务只有所有验证器测试全过才记 1.0，任何一个失败就是 0.0，按 pass@1 resolved rate 汇总（当前榜单每任务跑 8 次；论文口径为 5 次）。验证是多层的：可见加隐藏测试、行为对齐、性能门槛，产品克隆类任务还会派一个 Computer-Use agent 像真人一样操作浏览器 UI 来验收。防作弊做得很重：网络出站限制加对抗性漏洞扫描，专门抓 reward hacking，官网榜单上会公开标出「Cheating Attempts」。

## 典型任务

题目硬核到近乎残忍：「用 Rust 写一个多遍 C 编译器，从预处理一路做到 x86-64 代码生成」（当前通过率 0%）；「用 Rust 重新实现 Kubernetes 的控制面和节点组件，保持 API 语义兼容」（38.8%）；「按 RFC 8878 规范用 C99 实现一个 Zstandard 解压器，包括块、FSE、Huffman 编码和字典」（85%）；「克隆一个 Slack：实时 API、频道、消息串、搜索、浏览器 UI 全都要」（0%）。也就是说，最难的题目前没有任何 agent 能完整做出来。

## 分数怎么看

发布时最强 agent 通过率不到 30%；官网当前榜单（v1.1）榜首 Claude Opus 5 为 50.0%，Kimi K3 48.1%，GLM 5.2 为 19.4%——头部进步很快，但离「全通关」还很远。注意这是 20 道题的通过率，一道题就是 5 个百分点，小差距别太当真；官网同时给出衡量「完成度」的部分分，通常远高于严格通过率。

## 含金量与局限

名字带 SWE 但与 SWE-bench 官方没有血缘关系，是 Abundant 团队的独立基准，两边分数不可类比。任务总量只有 20 个，统计意义有限；且不同期榜单的每任务重复次数有变化（论文 5 次、现榜 8 次），跨版本比较留意口径。

## 冷知识

这份考卷的灵感来自 AI 圈的著名实验——Anthropic 让模型写 C 编译器、OpenAI 的 Parameter Golf——出题方直接把这些「名场面」变成了正式考题。而单次 rollout 平均烧 2720 万 token，跑一轮评测的账单本身就足够夸张。
