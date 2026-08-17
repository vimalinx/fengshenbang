---
id: vibe-code-bench
name: Vibe Code Bench
category: coding
organizer: H. Tran 等（Vals AI × MIT，CAIS 2026），arXiv:2603.04601；榜单由 Vals AI 运营
url: https://arxiv.org/abs/2603.04601
aliases: []
traits:
  - 从零到一 Web 应用
  - 浏览器 agent 验收
  - 真实注册/支付流程
  - 限时 5 小时开发
  - Vals AI 运营榜
facts:
  - label: 发布方
    value: Vals AI × MIT（H. Tran、Alex Gu 等），CAIS 2026 论文
  - label: 任务规模
    value: 100 个应用规格（50 公开验证 + 50 隐藏测试）
  - label: 验收强度
    value: 964 条浏览器工作流、共 10131 个操作子步骤
  - label: 开发环境
    value: OpenHands 改造沙箱，统一 React+Vite+Tailwind+Supabase，限 5 小时
  - label: 真实度
    value: 28% 的任务要求接 Stripe 支付或邮件服务（沙箱模式）
  - label: 榜单运营
    value: Vals AI（v1.1）
frontier:
  value: 61.8
  note: GPT-5.3-Codex 在隐藏测试集的工作流通过率 61.8%（论文 v2，2026-05，共测 16 个前沿模型）——「从零到一」交付完整应用对当前模型仍是未过关的挑战。
openSource:
  status: partial
  url: https://www.vals.ai/benchmarks/vibe-code
  note: 50 个公开验证集应用规格可见，50 个隐藏测试集不公开；评测管线由 Vals AI 商业化运营（v1.1），论文（arXiv:2603.04601）公开方法但未开放完整数据
history:
  - date: "2025-02-24"
    event: Vals AI 上线 Vibe Code Bench 公开榜单（据 vals.ai 页面，v1.1 含数据与管线更新），产品化评测先于论文
  - date: 2026-03
    event: arXiv 论文版发布（arXiv:2603.04601），系统公开 100 规格与浏览器验收管线
  - date: "2026-05-05"
    event: arXiv v2：补全 16 模型评测、成本/延迟分析与人类对齐研究
  - date: "2026-05-27"
    event: 在 ACM CAIS 2026 会议正式发表
ladder:
  - model: Claude Fable 5
    score: 90.35%
    note: 官方榜 v1.1 工作流通过率，2026-08
  - model: Claude Opus 5
    score: 88.40%
    note: 官方榜 v1.1，2026-08
  - model: Kimi K3
    score: 84.96%
    note: 官方榜 v1.1，开源权重最佳，2026-08
  - model: Claude Opus 4.8
    score: 82.72%
    note: 官方榜 v1.1，2026-08
  - model: DeepSeek V4 Pro 0813
    score: 82.30%
    note: 官方榜 v1.1，2026-08
  - model: Claude Sonnet 5
    score: 81.33%
    note: 官方榜 v1.1，2026-08
  - model: GPT-5.6 Sol
    score: 80.50%
    note: 官方榜 v1.1，2026-08
  - model: Meta Muse Spark 1.2
    score: 79.10%
    note: 官方榜 v1.1，2026-08
relatedIds:
  - qwenwebdev
  - webdev-arena
  - swe-bench-verified
---

## 一句话

给一句需求让 AI 做出完整能跑的 Web 应用，再派浏览器去验收

## 测什么

测的是「vibe coding」的核心承诺：非技术用户用大白话描述需求，模型能不能从零交付一个完整可部署的 Web 应用——包括多文件代码、配置、数据库、登录、支付，全流程。与修 bug 类榜单不同，这是「从零到一」的绿地开发。共 100 个应用规格（50 个公开验证集 + 50 个隐藏测试集），覆盖个人小工具、独立创业者产品、企业内部系统三类场景。

## 怎么测

模型在 OpenHands 改造的沙箱容器里开发，有终端和浏览器，统一技术栈（React+Vite+Tailwind+Supabase），最长 5 小时，最终交付 Docker Compose 可启动的应用；28% 的任务还要求接 Stripe 支付或邮件服务（沙箱模式）。验收不看代码，而是派一个自主浏览器 agent 像真人一样点开应用按流程操作：每个应用配 6–23 条工作流，共 964 条、10131 个操作子步骤，按子步骤完成率打分。

## 典型任务

规格写得像真实用户的口吻，比如「做一个记录个人习惯的打卡应用」「做一个在拥堵城区找车位并预约的应用」「做一个采购申请提交与审批的内部系统」（后者还带角色权限层级）。验收工作流也很具体：社交媒体类应用的一条测试流是「用邮箱 X 注册账号→发一条新帖子→评论这条帖子→退出登录」，浏览器 agent 逐步点击执行，每步成败都记录在案。

## 分数怎么看

测过 16 个前沿模型，测试集最好成绩是 GPT-5.3-Codex 的 61.8% 工作流通过率——离「可靠交付」还很远。这个榜的区分度远超传统编程榜：论文指出 MiniMax M2.5 与 Claude Opus 4.6 在 SWE-Bench 上只差 2.8%，在这里却差 42.7%。另一个有趣发现：模型开发过程中自己开浏览器测试应用的行为与最终成绩强相关（Pearson r=0.72）。

## 含金量与局限

验收由浏览器 agent 执行，本身会犯错：论文的对齐研究显示不同评估器两两间子步骤级一致率在 31.8%–93.6% 之间波动，换评估器可能换排名。榜单由 Vals AI 商业化运营，v1.1 与论文版数据管线有更新，比较分数需对齐版本。隐藏测试集占一半，公开集上的调参结论未必外推。

## 冷知识

论文挖出一个很「人味」的规律：开发过程中会主动打开浏览器自测应用的模型，最终成绩显著更好（Pearson r=0.72）——会自检的程序员才是好程序员。另一组对比常被引用：MiniMax M2.5 和 Claude Opus 4.6 在 SWE-Bench 上只差 2.8%，到这里拉开 42.7%，说明修 bug 强不代表能从零盖楼。
