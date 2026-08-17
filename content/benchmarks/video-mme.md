---
id: video-mme
name: Video-MME
category: multimodal
organizer: Chaoyou Fu 等（中科大/厦大等），CVPR 2025，arXiv:2405.21075
url: https://github.com/MME-Benchmarks/Video-MME
aliases:
  - VideoMME
traits:
  - 900 段 YouTube 视频
  - 按时长分三档
  - 纯规则判分
  - w/ 与 w/o 字幕口径
  - CVPR 2025
facts:
  - label: 规模
    value: 900 段视频、共 254 小时、2,700 道选择题（每视频 3 题）
  - label: 覆盖
    value: 6 大视觉领域、30 个子类（天文、电竞、纪录片、魔术、时尚等）
  - label: 时长分档
    value: 短 <2 分钟 / 中 4–15 分钟 / 长 30–60 分钟，全跨度 11 秒–1 小时
  - label: 多模态素材
    value: 744 份字幕 + 900 份音轨，支持 w/ 与 w/o subtitles 两口径
  - label: 质检
    value: 纯文本题干喂 Gemini 1.5 Pro，不看视频能答对的题一律淘汰
  - label: 学术认可
    value: CVPR 2025 录用，Paper Digest 统计为该届引用第一（1100+ 次）
frontier:
  value: 87.4
  note: >-
    厂商自报口径：Kimi K2.5 报 87.4%（aiwiki.ai 2026-04 汇总，当时榜首）；此前 Gemini 2.5 Pro 官方口径 84.8%（2025-05）；Kimi
    K3 带字幕口径报到 90%（2026-08 自报）。注意均为自报且带不带字幕口径不同。
openSource:
  status: open
  url: https://github.com/MME-Benchmarks/Video-MME
  note: 数据与评测代码公开于 GitHub（MME-Benchmarks/Video-MME）；官方页 github.com/MME-Benchmarks/Video-MME
history:
  - date: "2024-05-31"
    event: arXiv 论文上线（2405.21075）
  - date: "2024-06-03"
    event: 项目正式发布，自称首个视频分析全覆盖评测
  - date: "2024-06-15"
    event: 官方刷新：替换失效视频链接并重标，GPT-4o 改为 384 帧采样（71.9%）
  - date: "2025-02-27"
    event: 被 CVPR 2025 录用
  - date: "2025-04-14"
    event: OpenAI 在 GPT-4.1 发布中称其为多模态长上下文的「industry standard measure」
  - date: 2026-04
    event: 原团队发布后继基准 Video-MME-v2（800 视频）：Gemini 3 Pro 仅 49.4%，人类 90.7%，直指 v1 已趋饱和
ladder:
  - model: Kimi K3
    score: 90.4%
    note: 厂商自报（HF 模型卡，全 1M 上下文），2026-07
  - model: Kimi K2.5
    score: 87.4%
    note: 厂商自报（aiwiki.ai 汇总，2026-04），当时榜首
  - model: Gemini 2.5 Pro
    score: 84.8%
    note: Google 官方口径，2025-05
  - model: Gemini 1.5 Pro
    score: 75%
    note: 发布时榜首（无字幕口径，2024-06）
  - model: GPT-4o
    score: 71.9%
    note: 发布时实测（384 帧采样，2024-06）
relatedIds:
  - video-mmmu
---

## 一句话

从 11 秒到 1 小时的视频理解全科考试

## 测什么

900 段 YouTube 视频、254 小时、2700 道人工标注的选择题（每视频 3 题），覆盖知识、影视、体育、艺术表演、生活记录、多语言 6 大领域 30 个子类。核心设计是按时长分档：短片（2 分钟内）、中片（4–15 分钟）、长片（30–60 分钟），专门考察模型在视频变长时理解力衰减多少。所有题目都是标注者反复看完整个视频后新出的，不是从旧数据集搬来的。出题后还有一道防线：把纯文本题干喂给 Gemini 1.5 Pro，不看视频也能答对的题一律淘汰（最终纯文本瞎答准确率不到 15%）。

## 怎么测

多选 VideoQA，每题 4 个选项，按准确率计分（随机猜 25%）。输入为抽帧后的视频画面 + 题目，官方报两个口径：w/o subtitles（只给画面）和 w subtitles（附带字幕文本），音频维度另有单独实验。判分是纯规则匹配选项字母，不引入第三方模型当裁判。

## 典型任务

论文举的真题：一段旅行 vlog 里，画面显示「Day 1 是 2021 年 5 月 31 日」、旁白提到优胜美地国家公园，问题问出发日期是哪天——模型得同时读画面文字、听/读字幕，再做一步日期推算。另一类难题把答案线索打散在 30 分钟长片的不同片段里，不看完整个视频根本凑不齐选项依据。

## 分数怎么看

发布时 Gemini 1.5 Pro 以 75%（无字幕）领跑，GPT-4o 为 71.9%，最强开源模型 VILA-1.5 约 59%；Gemini 2.5 Pro 官方口径已到 84.8%。所有模型都有统一规律：视频越长分越低，长片子集是最能拉开差距的部分。

## 含金量与局限

视频来自 YouTube 公开内容，存在被爬进训练语料的可能；官方 2024-06 刷新过一次失效链接并重标。分数对抽帧数量很敏感（GPT-4o 从 10 帧加到 384 帧后准确率明显上涨），不同模型的评测配置不齐会直接影响可比性。另外别和 Video-MMMU 混淆，后者考的是「从课程视频学知识」。

## 冷知识

质检环节的「守门员」是 Gemini 1.5 Pro：论文举例，「阿根廷 10 号 2022 年最大的成就是什么」这种不看视频也知道是世界杯冠军的题会被直接淘汰。一年后同一个团队又亲手「拆台」：Video-MME-v2 把答案选项扩到 8 个、改用组群非线性计分，让榜上一堆 80+ 的模型重新跌回 50 分档。
