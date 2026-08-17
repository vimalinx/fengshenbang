---
id: swe-bench-verified
name: SWE-bench Verified
category: coding
organizer: SWE-bench 团队（Princeton NLP）× OpenAI，2024-08 发布
url: https://www.swebench.com/
aliases:
  - SWE-Bench Verified
  - SWE-Verified
  - SWE-bench Verified（初版/Code 版/前代实测/3.1 Pro 参考/OpenHands 100-turn）
  - 独立 SWE-bench 评测
  - SWE-bench 开源榜
  - SWE-bench 系列
  - SWE-bench Verified 编码榜
traits:
  - 真实 GitHub issue
  - 人工筛选 500 题
  - 跑测试判分
  - Agent 端到端修 bug
  - 2026-02 官方弃用
facts:
  - label: 题量
    value: 500 个任务（人工筛自原版 2294 个 GitHub issue）
  - label: 来源
    value: 12 个成熟 Python 仓库（django、sympy、scikit-learn、astropy 等）
  - label: 发布
    value: 2024-08（原版 SWE-bench 为 2023-10）
  - label: 计分
    value: "% Resolved（pass@1）：补丁跑 fail-to-pass + pass-to-pass 测试"
  - label: 数据
    value: "公开（HuggingFace: princeton-nlp/SWE-bench_Verified）"
  - label: 状态
    value: 2026-02 被 OpenAI 宣布弃用
frontier:
  value: 80
  note: 头部模型 2025–2026 年间普遍超过 80%；但 OpenAI 审计发现前沿模型能逐字背出部分参考答案，官方已于 2026-02 宣布弃用。
openSource:
  status: open
  url: https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified
  note: 数据集在 HuggingFace（princeton-nlp/SWE-bench_Verified）公开，评测代码在 GitHub（swe-bench/SWE-bench）公开
history:
  - date: 2023-10
    event: 原版 SWE-bench 发布（Princeton NLP，2294 个真实 GitHub issue）
  - date: 2024-08
    event: 与 OpenAI 合作推出人工筛选的 500 题 Verified 版
  - date: 2024–2026
    event: 成为编程榜事实标准，头部模型分数一路冲到 80% 以上
  - date: 2026-02
    event: OpenAI 审计 138 个难题发现 59.4% 有实质缺陷，宣布弃用并建议行业停用
ladder:
  - model: Claude Opus 5
    score: 96.0%
    note: Anthropic 自报，2026-07 发布；BenchLM 同录 96%
  - model: Claude Mythos 5
    score: 95.5%
    note: Anthropic 自报（Claude 5 系统卡，5 次平均），2026-06
  - model: Claude Fable 5
    score: 95.0%
    note: 同上；llm-stats 聚合口径 0.950 居首
  - model: Claude Mythos Preview
    score: 93.9%
    note: Anthropic，2026-04（steel.dev 追踪）
  - model: Claude Opus 4.8
    score: 88.6%
    note: Anthropic 自报（Opus 4.8 系统卡），2026-05
  - model: Claude Opus 4.7
    score: 87.6%
    note: Anthropic，2026-04（steel.dev 追踪）
  - model: GPT-5.6 Sol
    score: 82.2%
    note: 第三方实测（Thinking Machines，2026-07）；OpenAI 2026-02 起停报 Verified 官方分
  - model: Claude Opus 4.5
    score: 80.9%
    note: 官方榜自报，2025-11
  - model: Claude Opus 4.6
    score: 80.8%
    note: Anthropic 自报，2026-02
  - model: DeepSeek-V4-Pro-Max
    score: 80.6%
    note: DeepSeek，2026-04；开源权重最佳（llm-stats 第 8）
  - model: Gemini 3.1 Pro
    score: 80.6%
    note: Google DeepMind 自报，2026-02
  - model: Kimi K2.6
    score: 80.2%
    note: Moonshot AI，2026-04（steel.dev 追踪）
relatedIds:
  - swe-bench-pro
  - swe-bench-multilingual
  - swe-marathon
---

## 一句话

给 AI 出真实 GitHub issue，让它把 bug 修好

## 测什么

从原版 SWE-bench 的 2294 个真实 GitHub issue 里，由人工筛出 500 个「确实能解、描述清楚」的任务，全部来自 django、scikit-learn、sympy、matplotlib、astropy 等 12 个成熟 Python 项目。它测的不是写片段代码，而是端到端的软件工程能力：agent 要读懂用户抱怨、在上万行的陌生代码库里定位病灶、写出不破坏其他功能的补丁。之所以要人工筛选，是因为原版里不少任务描述含糊或测试有问题，分数会失真。

## 怎么测

agent 拿到两样东西：一段用户写的 issue 描述，和 bug 被修复之前那一刻的完整仓库快照，然后自由探索、改代码，最后产出一个补丁文件。评测把补丁打进仓库跑两组测试：fail-to-pass 测试（原来失败、修好后必须通过的）确认 bug 真被修好，pass-to-pass 测试确认没把别的功能弄坏。全过才算 Resolved，报 % Resolved（pass@1，即一次出手就修好的比例）。

## 典型任务

以经典任务 astropy-14635 为例：用户报告天文数据库 astropy 的 QDP 文件读取器有个 bug——它错误地假设输入命令必须全是大写，导致「read serr 1 2」这样的小写命令直接崩溃，而 QDP 格式本身是不区分大小写的。agent 只拿到这段用户吐槽和整个 astropy 源码，要自己找到 QDP 解析模块、改成兼容大小写、且不影响其他读取逻辑。多数顶尖 agent 在这题上栽过跟头：要么补丁只处理了用户给的特例（过拟合），要么改动不完整、没覆盖边界情况。

## 分数怎么看

% Resolved 越高越好。它发布后的两年里是编程榜的绝对主角，头部模型分数一路冲到 80% 以上——但冲得越高越可疑：OpenAI 的审计发现，GPT-5.2、Claude Opus 4.5、Gemini 3 Flash 等前沿模型都能逐字背出部分题目的官方参考答案，高分里有多少是真本事已经说不清。

## 含金量与局限

OpenAI 已于 2026-02 宣布弃用并建议行业停用：审计 138 个难题发现 59.4% 存在实质缺陷——35.5% 的测试过窄、把功能正确但实现不同的解法误判为错，18.8% 的测试过宽、检查了题目根本没要求的功能；且所有受测前沿模型都存在训练数据污染。本站保留此条主要是历史定位，新项目建议看 SWE-bench Pro。

## 冷知识

最戏剧性的是「亲生父母亲手判死刑」：OpenAI 是 Verified 的联合出品方，两年后却自己发审计报告建议全行业停用它——受审的 138 个难题近六成有毛病，而且 GPT-5.2、Claude Opus 4.5 这些尖子生都能逐字默写参考答案，高分里有多少真本事已经说不清。
