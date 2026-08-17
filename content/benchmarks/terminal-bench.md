---
id: terminal-bench
name: Terminal-Bench
category: coding
organizer: Stanford × Laude Institute（2.0 与 Snorkel AI 合作），arXiv:2601.11868
url: https://www.tbench.ai/
aliases:
  - Terminal-Bench 2.0/2.1
  - Terminal Bench 2.0/2.1
  - Terminal-bench 2.1
  - TerminalBench
  - Terminal-Bench 2.1（3.5 Flash 分数/Flash 正式版）
traits:
  - 真实终端环境
  - Docker 容器判分
  - 只看最终状态不看过程
  - 社区众包任务
  - 2.1 为当前版本
facts:
  - label: 题量
    value: v1.0 共 80 任务 → 2.0 共 89 → 2.1 为当前版
  - label: 发布方
    value: Stanford × Laude Institute（2.0 与 Snorkel AI 合作）
  - label: 计分
    value: 任务通过率：只看 Docker 容器最终状态，不看过程
  - label: 构造方式
    value: 93 位贡献者众包 229 题，三轮审查留下 89 题，每题约 3 小时审查人力
  - label: 运行环境
    value: Harbor harness，支持 Claude Code / Codex CLI / OpenHands 等主流 agent
frontier:
  value: 63
  note: >-
    2.0 论文（arXiv:2601.11868）最强为 Codex CLI + GPT-5.2 的 63%；开源权重最佳为 Kimi K2 Thinking 的 36%。注意 2.1 与
    2.0 分数不可直接比。
openSource:
  status: open
  url: https://github.com/terminal-bench-hub/terminal-bench
  note: 任务数据集与评测框架（Harbor harness）在 GitHub 公开（terminal-bench-hub/terminal-bench），2.0/2.1 榜单均在线可查
history:
  - date: "2025"
    event: v1.0 发布（80 任务）
  - date: 2025-10
    event: 2.0 发布（89 任务，与 Snorkel AI 合作）
  - date: 2026-01
    event: 2.0 论文上线（arXiv:2601.11868），最强组合 63%，官方预计约一年内可能饱和
  - date: 2026-04
    event: 曝出提交者在 AGENTS.md 给自家 agent 塞答案的作弊事件，官方审查处理
  - date: "2026"
    event: 2.1 成为当前版本
ladder:
  - model: Claude Code + Fable 5
    score: 83.8%
    note: 官方榜 2.1，xhigh，2026-06
  - model: Codex + GPT-5.5
    score: 83.1%
    note: 官方榜 2.1，xhigh，2026-05
  - model: Terminus 2 + Fable 5
    score: 80.4%
    note: 官方榜 2.1，high，2026-06
  - model: Cursor CLI + Grok 4.5
    score: 79.3%
    note: 官方榜 2.1，high，2026-07
  - model: Claude Code + Opus 4.8
    score: 78.9%
    note: 官方榜 2.1，high，2026-07
  - model: Codex + GPT-5.6 Terra
    score: 78.4%
    note: 官方榜 2.1，max，2026-07
  - model: Terminus 2 + GPT-5.5
    score: 78.0%
    note: 官方榜 2.1，xhigh，2026-05
  - model: mini-SWE-agent + Muse Spark 1.1
    score: 76.2%
    note: 官方榜 2.1，xhigh，2026-07
  - model: Codex + GPT-5.6 Luna
    score: 75.7%
    note: 官方榜 2.1，max，2026-07
  - model: Claude Code + Sonnet 5
    score: 74.6%
    note: 官方榜 2.1，high，2026-07
  - model: Terminus 2 + Gemini 3 Pro
    score: 73.9%
    note: 官方榜 2.1，high，2026-05
  - model: Claude Code + Opus 4.7
    score: 68.9%
    note: 官方榜 2.1，max，2026-05
relatedIds:
  - swe-marathon
  - frontier-bench
---

## 一句话

把 AI 扔进真实终端，干编译内核这类硬活

## 测什么

测 agent 在真实命令行环境里完成高技能工作的能力：配系统、复现论文、逆向二进制、训模型、从源码构建 Linux 这类专业人士拿工资干的活。任务由社区众包而来——93 位贡献者提交了 229 个任务，经作者难度评估和三轮人工审查后留下 89 个，构成 2.0 数据集，平均每题花了约 3 小时的审查人力。它考的不仅是写代码，而是「在终端里把一件完整的事做成」：探索环境、装依赖、调试、验证，链条很长。

## 怎么测

每个任务由四件套组成：一段自然语言指令、一个装好环境的 Docker 镜像、一组验证测试、一份人工写的参考解法（oracle solution），外加时间限制。agent 在容器里自由活动，可以用任何手段（不限于敲命令）；判分只看任务结束后容器的最终状态是否满足要求，不看过程、不看敲了什么命令——测试脚本会被拷进容器执行。统一用 Harbor harness 调度，支持 Claude Code、Codex CLI、OpenHands 等主流 agent，官方还做了只有一个「无头终端」工具的中性脚手架 Terminus 2 便于公平比较模型。

## 典型任务

题目风格五花八门：一题要求把一段 COBOL 程序重写成 Python，判定标准是逐输入比对两个程序的输出完全一致；另一题要求写一个能并行调度 n 个异步任务、且在键盘中断时正确执行各任务清理代码的函数，agent 得自己发 Ctrl+C 做交互式测试。最难的一档如 fix-ocaml-gc——修复一次失败的 OCaml 垃圾回收器优化，出题者估计领域专家要 24 小时、初级工程师要 10 天；feal-differential-cryptanalysis（对 FEAL 密码做差分密码分析）和 path-tracing（实现基于物理的渲染器）也属于人类标为「难」且模型确实做不动的硬题。

## 分数怎么看

报任务通过率。2.0 论文中最好成绩是 Codex CLI 配 GPT-5.2 的 63%，Terminus 2 配 Claude Opus 4.5 为 58%；开源权重模型最好是 Kimi K2 Thinking 的 36%，小模型普遍在 15% 上下。论文同时观察到前沿水平八个月几乎翻倍，官方自己也预计它可能在一年左右饱和，计划持续出新任务集。

## 含金量与局限

版本演进快：v1.0（80 任务）→ 2.0（89 任务，2025-10）→ 2.1（当前版），2.0 与 2.1 的分数不可混比。另外众包模式有过信任危机：2026-04 曝出提交者在 AGENTS.md 里给自家 agent 塞答案的作弊事件，官方已审查处理——读历史分数时留意这一背景。

## 冷知识

众包出题招来了「内鬼」：2026-04 有任务提交者被发现往 AGENTS.md 里塞答案，让自家 agent 开卷考试。官方的对策是引入一个专门找作弊口的对抗性「漏洞利用 agent」——出题与作弊的攻防战，成了这个项目日常的一部分。
